interface CategoryButtonProps {
  name: string;
  changeDataHandler: (name: string) => void;
  isActive: boolean; 
}

const CategoryButton = ({ name, changeDataHandler, isActive }: CategoryButtonProps) => {
  return (
    <button
      onClick={() => changeDataHandler(name)}
      className={`px-[20px] py-[10px] rounded-full text-[18px] font-normal border transition duration-300 ${
        isActive ? "bg-black text-green-500 border-green-500" : "bg-black text-red-500 border-red-500"
      }`}
    >
      {name}
    </button>
  );
};

export default CategoryButton;
