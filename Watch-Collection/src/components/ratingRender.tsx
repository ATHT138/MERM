import { useState } from "react";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

interface RatingRenderProps {
  rating?: number;
  onChangeRating?: (rating: number) => void;
  interactive?: boolean;
  totalStars?: number;
}

const RatingRender = ({
  rating = 0,
  onChangeRating,
  interactive = false,
  totalStars = 5,
}: RatingRenderProps) => {
  const [hoverRating, setHoverRating] = useState<number | undefined>(undefined);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleRatingClick = (index: number) => {
    if (onChangeRating && interactive) {
      onChangeRating(index + 1);
      setIsClicked(true);
      setHoverRating(undefined);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isClicked) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setHoverRating(undefined);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, i) => {
        const currentRating = hoverRating !== undefined ? hoverRating : rating;
        const isFullStar = currentRating >= i + 1;

        return (
          <div
            key={i}
            className={`cursor-pointer ${
              interactive ? "pointer-events-auto" : "pointer-events-none"
            }`}
            onClick={() => handleRatingClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {isFullStar ? (
              <SolidStarIcon className="w-4 h-4 text-yellow-400" />
            ) : (
              <OutlineStarIcon className="w-4 h-4 text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RatingRender;
