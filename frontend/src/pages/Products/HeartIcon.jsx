import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favourites/favouriteSlice";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorites = (e) => {
    e.stopPropagation(); // Prevent navigating to product details when clicking heart
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className="absolute top-3 right-3 cursor-pointer z-20 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group"
      onClick={toggleFavorites}
      title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      {isFavorite ? (
        <FaHeart className="text-primary drop-shadow-md transform group-hover:scale-110 transition-transform" size={20} />
      ) : (
        <FaRegHeart className="text-white drop-shadow-md transform group-hover:scale-110 transition-transform" size={20} />
      )}
    </div>
  );
};

export default HeartIcon;
