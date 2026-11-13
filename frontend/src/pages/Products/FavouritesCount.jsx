import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites) || [];
  const favoriteCount = favorites.length;

  if (favoriteCount === 0) return null;

  return (
    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black animate-pulse pointer-events-none">
      {favoriteCount}
    </span>
  );
};

export default FavoritesCount;
