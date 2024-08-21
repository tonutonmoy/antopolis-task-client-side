const Card = ({ img, name }: any) => {
    return (
      <div className=" w-[150px] ">
        <section>
          <img
            src={img}
            alt=""
            className="border w-full h-[200px] border-gray-300 border-opacity-15 p-4"
          />
        </section>
        <section className=" ">
          <h2 className="text-gray-50  text-[20px] text-center mt-5  overflow-auto">{name}</h2>
        </section>
      </div>
    );
  };
  
  export default Card;
  