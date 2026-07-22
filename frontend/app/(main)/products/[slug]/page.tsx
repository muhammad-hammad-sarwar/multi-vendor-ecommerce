"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { ProductCard } from "@/components/Products/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishlist";
import { addToCart } from "@/redux/slices/cart";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";
import useCountDown from "@/hooks/useCountDown";
import Rating from "@/components/Common/Ratings";
import { createConversation } from "@/redux/actions/conversations";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import { toast } from "react-toastify";

export default function ProductDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const isEvent = searchParams.get("isEvent");
  const { loading, allProducts } = useAppSelector((state) => state.products);
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const {
    allEvents,
    loading: eventLoading,
    error: EventError,
  } = useAppSelector((state) => state.events);
  const {
    loading: conversationLoading,
    conversation,
    error: ConversationError,
  } = useAppSelector((state) => state.conversation);
  const product = isEvent
    ? allEvents?.find((item) => item._id === params.slug)
    : allProducts?.find((item) => item._id === params.slug);
  const [tab, setTab] = useState("Details");
  const [activeImage, setActiveImage] = useState(product?.images?.[0]);
  const [isFavourite, setIsFavourite] = useState(false);
  const { timeLeft, isMounted } = useCountDown(
    `${(isEvent && product?.endDate) || ""}`,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const related = isEvent
    ? allEvents?.filter(
        (p) => p.category === product?.category && p._id !== product._id,
      )
    : allProducts?.filter(
        (p) => p.category === product?.category && p._id !== product._id,
      );

  useEffect(() => {
    if (product) {
      const doesExist = wishlist?.find((item) => item?._id == product?._id);
      if (doesExist) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    }

    if (product && !activeImage) {
      setActiveImage(product?.images?.[0]);
    }
  }, [params, allProducts, wishlist]);
  const handleMessage = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to continue");
      return;
    }

    try {
      const conversation = await dispatch(
        createConversation({
          sellerId: product.shop._id,
          userId: user._id,
        }),
      );

      router.push(`/conversation/${conversation._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  if (loading || !allProducts) return <>loading</>;
  // Product here is being treated as an event and a product as well
  if (!isEvent && !product && !loading) return <>No Product found</>;
  if (isEvent && !product && !eventLoading) return <>No Event found</>;
  if (isEvent && (eventLoading || (!EventError && !allEvents)))
    return <>loading</>;

  const totalProducts = isEvent
    ? allEvents?.reduce(
        (acc, cur) => (cur?.shop?._id === product?.shop?._id ? acc + 1 : acc),
        0,
      )
    : allProducts?.reduce(
        (acc, cur) => (cur?.shop?._id === product?.shop?._id ? acc + 1 : acc),
        0,
      );

  const getShopStats = () => {
    const allShopProducts = isEvent
      ? allEvents.filter((p) => p.shop?._id === product?.shop?._id)
      : allProducts.filter((p) => p.shop?._id === product?.shop?._id);

    let totalReviews = 0;
    let totalRating = 0;

    allShopProducts.forEach((product) => {
      product.reviews?.forEach((review) => {
        totalReviews++;
        totalRating += review.rating;
      });
    });

    return {
      totalReviews,
      averageRating: totalReviews ? totalRating / totalReviews : 0,
    };
  };
  const { totalReviews, averageRating } = getShopStats();

  return (
    <section className="w-11/12 mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={`http://localhost:8000/uploads/${activeImage}`}
            className="w-full h-100 object-contain border rounded-lg"
          />

          <div className="flex gap-3 mt-4">
            {product?.images.map((img) => (
              <img
                key={img}
                src={`http://localhost:8000/uploads/${img}`}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                  activeImage === img ? "border-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{product?.name}</h1>

          <p className="text-gray-600 text-sm">{product?.description}</p>

          <div>
            <span className="text-xl font-bold mr-2">
              ${product?.discountPrice || product?.originalPrice}
            </span>
            {product?.discountPrice && (
              <span className="line-through text-red-500">
                ${product?.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                dispatch(addToCart({ ...product, isEvent: isEvent === "true" }))
              }
              className="cursor-pointer bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <FiShoppingCart /> Add to Cart
            </button>

            {isFavourite ? (
              <button
                onClick={() => dispatch(removeFromWishlist(product?._id))}
                className="cursor-pointer border p-2 rounded-lg"
              >
                <AiFillHeart
                  className="text-red-600 cursor-pointer transition"
                  title="Remove from favourites"
                />
              </button>
            ) : (
              <button
                onClick={() =>
                  dispatch(
                    addToWishlist({ ...product, isEvent: isEvent === "true" }),
                  )
                }
                className="cursor-pointer border p-2 rounded-lg"
              >
                <FiHeart title="Add to favourites" />
              </button>
            )}
          </div>

          {isEvent && (
            <div className="mt-4 text-sm font-medium text-red-600">
              {isMounted && timeLeft.days === null ? (
                <div className="bg-red-400 w-40 h-8 rounded-sm animate-pulse" />
              ) : timeLeft.days == 0 ? (
                "Sale Ended!"
              ) : (
                `Ends in: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
              )}
            </div>
          )}

          <div className="flex items-center gap-4 border p-3 rounded-lg">
            <Link href={`/shop/preview/${product?.shop?._id}`}>
              <img
                src={`http://localhost:8000/uploads/${product?.shop?.avatar}`}
                className="w-12 h-12 rounded-full"
              />
            </Link>

            <div className="flex flex-col">
              <Link href={`/shop/preview/${product?.shop?._id}`}>
                <span className="font-medium">{product.shop?.name}</span>
              </Link>
              <span className="text-sm text-gray-500">
                {/* {product?.shop?.ratings || 0} rating */}
              </span>
            </div>

            <button
              onClick={handleMessage}
              className="ml-auto bg-black text-white h-10 w-30 rounded-lg cursor-pointer"
            >
              {conversationLoading ? <ButtonLoader /> : "Message Seller"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex gap-6 border-b">
          {["Details", "Reviews", "Seller"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 ${
                tab === t ? "border-b-2 border-blue-600" : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600">
          {tab === "Details" && <p>{product?.description}</p>}
          {tab === "Reviews" && (
            <div className="mt-2">
              <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>

              <div className="space-y-4">
                {product?.reviews?.length == 0 ? (
                  <h2>No Product Reviews</h2>
                ) : (
                  product?.reviews?.map((review) => (
                    <div
                      key={review?._id}
                      className="flex items-start justify-between gap-4 rounded-lg border p-4"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={`http://localhost:8000/uploads/${review?.user?.avatar}`}
                          alt={review?.user?.name}
                          className="w-12 h-12 rounded-full object-cover border"
                        />

                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {review?.user?.name}
                          </h3>

                          <p className="text-sm text-gray-600 mt-1">
                            {review?.comment}
                          </p>
                        </div>
                      </div>

                      <Rating rating={review?.rating} />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {tab === "Seller" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:8000/uploads/${product?.shop.avatar}`}
                    alt={product?.shop.name}
                    className="h-16 w-16 rounded-full object-cover border"
                  />

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {product?.shop.name}
                    </h2>

                    <p className="text-sm text-gray-500">Verified Seller</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-right">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Joined On
                    </p>
                    <p className="font-semibold text-gray-900">
                      {new Date(product?.shop?.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Products
                    </p>
                    <p className="font-semibold text-gray-900">
                      {totalProducts}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Reviews
                    </p>
                    <p className="font-semibold text-gray-900">
                      {totalReviews}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Rating
                    </p>

                    <div className="flex items-center justify-end gap-2">
                      {/* <Rating rating={reviewsAndRatings[1]} /> */}
                      <span className="font-semibold text-gray-900">
                        {averageRating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related?.length == 0 ? (
            <div>No Related {isEvent ? "Events" : "Products"}</div>
          ) : (
            related.map((p) => (
              <ProductCard key={p?._id} isEvent={true} product={p} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
