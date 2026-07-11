"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { ProductCard } from "@/components/Products/ProductCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishlist";
import { addToCart } from "@/redux/slices/cart";
import { AiFillHeart } from "react-icons/ai";
import Link from "next/link";

export default function ProductDetailsPage() {
  const params = useParams();
  const { loading, allProducts } = useAppSelector((state) => state.products);
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const product = allProducts?.find((item) => item._id === params.slug);
  const [tab, setTab] = useState("details");
  const [activeImage, setActiveImage] = useState(product?.images?.[0]);
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useAppDispatch();

  const related = allProducts?.filter(
    (p) => p.category === product?._id && p._id !== product._id,
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

  if (loading || !allProducts) return <>loading</>;
  if (!product && !loading) return <>No Product found</>;

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
              onClick={() => dispatch(addToCart(product))}
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
                onClick={() => dispatch(addToWishlist(product))}
                className="cursor-pointer border p-2 rounded-lg"
              >
                <FiHeart title="Add to favourites" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 border p-3 rounded-lg">
            <Link href={`/shop/preview/${product?.shop?._id}`}>
              <img
                src={`http://localhost:8000/uploads/${product?.shop?.avatar}`}
                className="w-12 h-12 rounded-full"
              />
            </Link>

            <div className="flex flex-col">
              <Link href={`/shop/preview/${product?.shop?._id}`}>
                <span className="font-medium">{product.shop.name}</span>
              </Link>
              <span className="text-sm text-gray-500">
                {/* {product?.shop?.ratings || 0} rating */}
              </span>
            </div>

            <button className="ml-auto text-blue-600 text-sm">
              Message Seller
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex gap-6 border-b">
          {["details", "reviews", "seller"].map((t) => (
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
          {tab === "details" && <p>{product?.description}</p>}
          {tab === "reviews" && <p>Customer reviews coming soon...</p>}
          {tab === "seller" && <p>Seller information here...</p>}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related?.length == 0 ? (
            <div>No Related Products</div>
          ) : (
            related.map((p) => <ProductCard product={p} />)
          )}
        </div>
      </div>
    </section>
  );
}
