"use client";
import { useState } from "react";
import { productData } from "@/lib/utils/static";
import { useParams } from "next/navigation";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { ProductCard } from "@/components/Products/ProductCard";

export default function ProductDetailsPage() {
  const params = useParams();
  console.log(params);
  const name = decodeURIComponent(params.slug as string);

  const product = productData.find(
    (p) => p.name.toLowerCase() === name.toLowerCase(),
  );

  const [activeImage, setActiveImage] = useState(product?.image_Url[0]?.url);

  const [tab, setTab] = useState("details");

  if (!product) return <div>Product not found</div>;

  const related = productData.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  return (
    <section className="w-11/12 mx-auto py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={activeImage}
            className="w-full h-100 object-contain border rounded-lg"
          />

          <div className="flex gap-3 mt-4">
            {product.image_Url.map((img) => (
              <img
                key={img.public_id}
                src={img.url}
                onClick={() => setActiveImage(img.url)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer ${
                  activeImage === img.url ? "border-blue-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <p className="text-gray-600 text-sm">{product.description}</p>

          <div>
            <span className="text-xl font-bold mr-2">
              ${product.discount_price || product.price}
            </span>
            {product.discount_price && (
              <span className="line-through text-red-500">
                ${product.price}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <FiShoppingCart /> Add to Cart
            </button>

            <button className="border p-2 rounded-lg">
              <FiHeart />
            </button>
          </div>

          <div className="flex items-center gap-4 border p-3 rounded-lg">
            <img
              src={product.shop.shop_avatar.url}
              className="w-12 h-12 rounded-full"
            />

            <div className="flex flex-col">
              <span className="font-medium">{product.shop.name}</span>
              <span className="text-sm text-gray-500">
                {product.shop.ratings} rating
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
          {tab === "details" && <p>{product.description}</p>}
          {tab === "reviews" && <p>Customer reviews coming soon...</p>}
          {tab === "seller" && <p>Seller information here...</p>}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((p) => (
            <ProductCard product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
