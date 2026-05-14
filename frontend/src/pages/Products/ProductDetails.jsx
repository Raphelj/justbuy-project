import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaChevronLeft,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const incrementQty = () => {
    if (qty < product.countInStock) setQty(qty + 1);
  }

  const decrementQty = () => {
    if (qty > 1) setQty(qty - 1);
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20 overflow-x-hidden">
      {/* Back Button */}
      <div className="container mx-auto px-6 lg:px-12 pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider"
        >
          <FaChevronLeft /> Back to Shop
        </Link>
      </div>

      {isLoading ? (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="container mx-auto px-6 lg:px-12 mt-10">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

              {/* Product Image Gallery */}
              <div className="lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6 z-10">
                    <HeartIcon product={product} />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="lg:w-1/2 lg:sticky lg:top-24 h-fit">
                <h5 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{product.brand}</h5>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-700"} />
                    ))}
                    <span className="text-white font-bold ml-2">{product.rating}</span>
                  </div>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <span className="text-gray-400 text-sm">{product.numReviews} Reviews</span>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                  {product.description}
                </p>

                <div className="flex items-end gap-4 mb-8">
                  <span className="text-4xl font-bold text-white">₹{product.price}</span>
                  {product.countInStock > 0 ? (
                    <span className="text-green-400 text-sm font-medium mb-2 bg-green-400/10 px-3 py-1 rounded-full">In Stock</span>
                  ) : (
                    <span className="text-red-400 text-sm font-medium mb-2 bg-red-400/10 px-3 py-1 rounded-full">Out of Stock</span>
                  )}
                </div>

                {/* Actions */}
                {product.countInStock > 0 && (
                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    {/* Quantity */}
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4">
                      <button onClick={decrementQty} className="p-2 text-gray-400 hover:text-white transition-colors">
                        <FaMinus size={12} />
                      </button>
                      <span className="w-12 text-center font-bold">{qty}</span>
                      <button onClick={incrementQty} className="p-2 text-gray-400 hover:text-white transition-colors">
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={addToCartHandler}
                      className="flex-1 bg-primary hover:bg-yellow-400 text-black font-bold py-4 rounded-full transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-3"
                    >
                      <FaShoppingCart /> Add To Cart
                    </button>
                  </div>
                )}

                {/* Meta Info */}
                <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-400 mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <FaStore className="text-primary" />
                    <span>Brand: <span className="text-white">{product.brand}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-primary" />
                    <span>Listed: <span className="text-white">{moment(product.createAt).fromNow()}</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBox className="text-primary" />
                    <span>Stock: <span className="text-white">{product.countInStock} Units</span></span>
                  </div>
                </div>

              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-24 max-w-4xl mx-auto">
              <h3 className="text-3xl font-heading font-bold mb-10 border-l-4 border-primary pl-6">Customer Reviews</h3>

              <div className="grid gap-8">
                {/* Review Form */}
                <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                  <h4 className="text-xl font-bold mb-6">Write a Review</h4>
                  {userInfo ? (
                    <form onSubmit={submitHandler} className="space-y-6">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Rating</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setRating(val)}
                              className={`text-2xl transition-colors ${rating >= val ? "text-yellow-400" : "text-gray-700"}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Comment</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows="4"
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-primary focus:outline-none transition-colors"
                          placeholder="Share your thoughts..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={loadingProductReview}
                        className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        Submit Review
                      </button>
                    </form>
                  ) : (
                    <p className="text-gray-400">Please <Link to="/login" className="text-primary hover:underline">sign in</Link> to write a review.</p>
                  )}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {product.reviews.length === 0 && (
                    <div className="text-center py-10 text-gray-500 bg-white/5 rounded-2xl">No reviews yet. Be the first to review!</div>
                  )}

                  {product.reviews.map((review) => (
                    <div key={review._id} className="bg-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-lg">
                          {review.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-bold text-lg">{review.name}</h5>
                          <span className="text-sm text-gray-500">{moment(review.createdAt).format("MMM Do YYYY")}</span>
                        </div>
                        <div className="flex text-yellow-400 text-sm mb-3">
                          <Ratings value={review.rating} />
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
