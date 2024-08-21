"use client";
import { useGetAnimalQuery, useGetCategoryQuery } from "@/Redux/api/animalAndCaregory";
import AnimalModal from "../Animal/AnimalModal";
import CategoryModal from "../Category/CategoryModal";
import CategoryButton from "../CategoryButton/CategoryButton";
import Card from "../Card/Card";
import { useState } from "react";

const HomePage = () => {
  const [state, setState]:any = useState<string>("all"); 
  const { data: category, isLoading: categoryIsloading }: any = useGetCategoryQuery();
  const { data: animal, isLoading: animalIsloading }: any = useGetAnimalQuery(state);

  if (categoryIsloading || animalIsloading) {
    return '';
  }

  const changeDataHandler = (name: string) => {
    setState(name); 
  };

  return (
    <div className="w-[90%] mx-auto">
      <section className="pt-20 grid grid-cols-2 justify-between">
        <div className="flex flex-wrap gap-10">
          {category?.data?.map((a: any) => (
            <CategoryButton
              key={a?.name}
              name={a?.name}
              changeDataHandler={changeDataHandler}
              isActive={state === a?.name} 
            />
          ))}
        </div>
        <div className="flex justify-end gap-10">
          <CategoryModal />
          <AnimalModal />
        </div>
      </section>
      <section className="flex flex-wrap gap-10 my-20">
        {animal?.data?.map((a: any) => (
          <Card key={a?.name} name={a?.name} img={a?.img} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;
