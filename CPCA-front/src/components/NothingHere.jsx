import NothingImage from "../assets/nothing.png";

const NothingHere = () => {
  return (
    <div
      className="flex flex-col items-center justify-center"
    >
      <img src={NothingImage} alt="" />
      <h1 className="text-inherit">Nothing here!</h1>
    </div>
  );
};

export default NothingHere;
