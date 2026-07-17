import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
}

const Rating = ({ rating }: RatingProps) => {
  const fullStars = Number.isInteger(rating) ? rating : Math.floor(rating);

  const hasHalfStar = !Number.isInteger(rating);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        if (index < fullStars) {
          return <FaStar key={index} className="text-yellow-400" />;
        }

        if (index === fullStars && hasHalfStar) {
          return <FaStarHalfAlt key={index} className="text-yellow-400" />;
        }

        return <FaRegStar key={index} className="text-yellow-400" />;
      })}
    </div>
  );
};

export default Rating;
