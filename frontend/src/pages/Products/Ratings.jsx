import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value = 0, text, color = "text-yellow-400" }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStar = Math.max(0, 5 - fullStars - halfStars);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className={`${color} ml-1`} />
      ))}

      {halfStars === 1 && <FaStarHalfAlt className={`${color} ml-1`} />}

      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className={`${color} ml-1`} />
      ))}

      {text && (
        <span className={`rating-text ml-2 ${color}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Ratings;