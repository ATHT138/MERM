import assert from "@/asserts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

const Hero = () => {
  return (
    <div className="text-white bg-slate-700">
      <div className="container flex flex-col-reverse items-center px-4 pt-24 pb-24 mx-auto justify-evenly md:flex-row md:px-0 ">
        <div className="flex flex-col items-center gap-5 text-center md:text-left md:w-1/2 md:items-start">
          <h1 className="text-4xl font-bold md:text-6xl">Watch Collection</h1>
          <h6 className="text-lg md:text-xl">
            Crafting Elegance and Sophistication with Every Timepiece.
          </h6>
          <Link to="/watches">
            <Button className="px-6 py-2 mt-4">See More</Button>
          </Link>
        </div>
        <img
          src={assert.image.watch}
          alt="watch"
          className="mt-8 w-44 md:w-56 md:mt-0"
        />
      </div>
    </div>
  );
};

export default Hero;
