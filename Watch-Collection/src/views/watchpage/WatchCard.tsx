import { Watches } from "@/models/watch";
import { useState } from "react";
import { Link } from "react-router-dom";
import { setItem } from "../../lib/localStorage";

interface WatchCardProps {
  watch: Watches;
}

const WatchCard = ({ watch }: WatchCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      onClick={() => setItem("redirectPath", `/watch/${watch._id}`)}
      to={`/watch/${watch._id}`}
    >
      <div className="relative w-64 p-4 rounded-lg shadow-md">
        <img
          src={watch.image}
          alt={watch.watchName}
          className={`object-cover w-full h-48 rounded-lg transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-50 grayscale"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{watch.watchName}</h2>
          <p className="text-sm text-gray-500">{watch.brand.brandName}</p>
          <p className="absolute w-20 p-2 mt-4 text-sm font-bold text-center text-white bg-gray-400 bg-opacity-70 rounded-2xl right-6 top-3">
            $ {watch.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default WatchCard;
