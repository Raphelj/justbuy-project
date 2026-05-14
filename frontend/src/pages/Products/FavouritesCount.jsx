import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute -top-1 -right-2 pointer-events-none">
      {favoriteCount > 0 && (
        <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold text-black bg-primary rounded-full shadow-lg border border-black/20 animate-pulse">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
