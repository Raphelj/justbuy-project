import { useRef } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { FaStar, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.25, 1, 0.5, 1)",
  };

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-[#050505]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <Message variant="danger">{error?.data?.message || error.error}</Message>;
  }

  return (
    <div className="relative w-full overflow-hidden group">
      <Slider ref={sliderRef} {...settings} className="hero-slider">
        {products?.map((product) => (
          <div key={product._id} className="relative w-full h-[85vh] min-h-[600px] outline-none">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-12 sm:px-16 md:px-20 lg:px-24">
                <div className="max-w-3xl transform translate-y-8 animate-fade-in-up">

                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Top Rated</span>
                  </div>

                  {/* Brand */}
                  <h3 className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.2em] uppercase mb-2">
                    {product.brand}
                  </h3>

                  {/* Title */}
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl font-sans font-black text-white leading-tight mb-4 drop-shadow-2xl truncate block max-w-full"
                    title={product.name}
                  >
                    {product.name}
                  </h1>

                  {/* Description / Details */}
                  <p
                    className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6 max-w-xl"
                    title={product.description}
                  >
                    {product.description?.length > 140
                      ? `${product.description.substring(0, 140).trim()}....`
                      : product.description}
                  </p>

                  {/* Rating & Stats */}
                  <div className="flex items-center gap-6 mb-8 text-white/80 text-sm">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-primary" />
                      <span className="font-bold text-white">{product.rating}</span>
                    </div>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span>{product.numReviews} Reviews</span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                    <span>Added {moment(product.createdAt).fromNow()}</span>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl md:text-5xl font-bold text-white">
                        ${product.price}
                      </span>
                      {product.price > 100 && (
                        <span className="text-xl text-gray-500 line-through decoration-primary decoration-2">
                          ${(product.price * 1.15).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Link
                        to={`/product/${product._id}`}
                        className="group relative px-8 py-4 bg-primary text-black font-bold uppercase tracking-wider rounded-full overflow-hidden transition-transform hover:scale-105"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Shop Now <FaArrowRight />
                        </span>
                        <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </Link>
                      <Link
                        to={`/product/${product._id}`}
                        className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation Arrows for Sliding Left / Right */}
      {products?.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-3 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-black/75 border border-white/20 hover:border-primary text-white hover:text-primary flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 shadow-2xl focus:outline-none"
            aria-label="Slide Left"
          >
            <FaChevronLeft className="text-lg md:text-xl -translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-3 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-black/75 border border-white/20 hover:border-primary text-white hover:text-primary flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 shadow-2xl focus:outline-none"
            aria-label="Slide Right"
          >
            <FaChevronRight className="text-lg md:text-xl translate-x-0.5" />
          </button>
        </>
      )}

      {/* Custom Styles for Dots */}
      <style>{`
        .hero-slider .slick-dots {
            bottom: 40px;
            left: 50px;
            width: auto;
            text-align: left;
        }
        .hero-slider .slick-dots li {
            margin: 0 4px;
        }
        .hero-slider .slick-dots li button:before {
            color: white;
            opacity: 0.3;
            font-size: 10px;
        }
        .hero-slider .slick-dots li.slick-active button:before {
            color: var(--color-primary);
            opacity: 1;
            font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;