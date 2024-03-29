"use client";
import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from "./components";
import { HomeProps} from "@/types"
import Image from "next/image";
import { fetchCars } from "@/utils";
import { fuels, yearsOfProduction } from "@/constants";
import { useEffect, useState } from "react";

export default  function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [manuFacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");

  // filter states
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2023);

  // filter states
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);

    try {
      const result = await fetchCars({
        manufacturer: manuFacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });
  
      setAllCars(result);
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=> {
    getCars();
  }, [fuel, year, limit, manuFacturer, model])


  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  console.log(allCars)
  return (
    <main className="overflow-hidden ">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar setManuFacturer={setManuFacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter 
              title="fuel"  
              options={fuels} 
              setFilter={setFuel} />

            <CustomFilter 
              setFilter={setYear} 
              title='year' 
              options={yearsOfProduction} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) => (
                <CarCard car={car} key={`${index}`} />
              ))}
            </div>

            {loading && (
            <div className="mt-16 w-full flex-center">
              <Image 
                src="/loader.svg"
                alt="loader"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>)}

            <ShowMore
              pageNumber={limit / 10}
              isNext={limit  > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
