"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiBox,
  FiFileText,
  FiTag,
  FiDollarSign,
  FiPackage,
  FiUpload,
  FiLayers,
  FiX,
} from "react-icons/fi";
import { categoriesData } from "@/lib/utils/static";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const value = tagInput.trim();

    if (!value) return;
    if (tags.includes(value)) return;

    setTags([...tags, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);

    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);

    tags.forEach((tag) => formData.append("tags[]", tag));

    images.forEach((image) => {
      formData.append("images", image);
    });

    console.log(formData);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">Create Product</h1>

      <p className="text-gray-500 mt-1">Fill the product details below.</p>

      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        {/* Name */}

        <div>
          <label htmlFor="name" className="font-medium">
            Name <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <FiBox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg py-2 pl-10 bg-gray-50"
            />
          </div>
        </div>

        {/* Description */}

        <div>
          <label htmlFor="description" className="font-medium">
            Description <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <FiFileText className="absolute left-3 top-4 text-gray-400" />

            <textarea
              required
              id="description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg pt-2 pl-10 bg-gray-50"
            />
          </div>
        </div>

        {/* Category */}

        <div>
          <label htmlFor="category" className="font-medium">
            Category <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <FiLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <select
              required
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-lg py-2 pl-10 bg-gray-50"
            >
              <option value="">Select Category</option>
              {categoriesData.map((ctgry) => (
                <option key={ctgry.id} value={ctgry.title}>
                  {ctgry.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags */}

        <div>
          <label htmlFor="tag" className="font-medium">
            Tags
          </label>

          <div className="relative mt-1">
            <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              id="tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTag}
              placeholder="Press Enter"
              className="w-full border rounded-lg py-2 pl-10 bg-gray-50"
            />
          </div>

          <div className="flex gap-2 flex-wrap mt-3">
            {tags.map((tag) => (
              <div
                key={tag}
                className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 flex items-center gap-2"
              >
                {tag}

                <button type="button" onClick={() => removeTag(tag)}>
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Prices */}

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="originalPrice">
              Original Price <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-1">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                required
                id="originalPrice"
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full border rounded-lg py-2 pl-10 bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="discountPrice">Price after Discount</label>

            <div className="relative mt-1">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                id="discountPrice"
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full border rounded-lg py-2 pl-10 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Stock */}

        <div>
          <label htmlFor="stock">
            Product Stock <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border rounded-lg py-2 pl-10 bg-gray-50"
            />
          </div>
        </div>

        {/* Images */}

        <div>
          <label className="font-medium">
            Upload Images <span className="text-red-500">*</span>
          </label>

          <label className="mt-2 flex items-center gap-3 cursor-pointer">
            <input
              required
              hidden
              multiple
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImages}
            />

            <div className="flex items-center gap-2 text-blue-600">
              <FiUpload />
              Upload Images
            </div>
          </label>

          <div className="flex gap-4 mt-5 flex-wrap">
            {images.map((image) => (
              <Image
                key={image.name}
                src={URL.createObjectURL(image)}
                alt={image.name}
                width={100}
                height={100}
                className="rounded-lg object-cover h-24 w-24"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg w-full py-3"
        >
          {loading ? <ButtonLoader /> : "Create Product"}
        </button>
      </form>
    </>
  );
}
