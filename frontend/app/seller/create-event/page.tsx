"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiLayers,
  FiPackage,
  FiTag,
  FiUpload,
  FiX,
  FiBox,
} from "react-icons/fi";
import { categoriesData } from "@/lib/utils/static";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import api from "@/axios/api";

export default function CreateEvent() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const today = new Date().toISOString().split("T")[0];

  const getMinEndDate = (start: string) => {
    if (!start) return "";

    const date = new Date(start);
    date.setDate(date.getDate() + 3);

    return date.toISOString().split("T")[0];
  };

  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const value = tagInput.trim();
    if (!value || tags.includes(value)) return;

    setTags([...tags, value]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setImages((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setStartDate(value);

    if (endDate && (endDate < value || endDate > getMinEndDate(value))) {
      setEndDate("");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);

    formData.append("originalPrice", originalPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);

    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    tags.forEach((tag) => {
      formData.append("tags[]", tag);
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      console.log("Start Date", formData.get("startDate"));
      console.log("End Date", formData.get("endDate"));

      await api.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">Create Event</h1>

      <p className="text-gray-500 mt-1">Create a new event for your shop.</p>

      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div>
          <label htmlFor="name" className="font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <FiBox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="font-medium text-gray-700">
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
              className="w-full rounded-lg border bg-gray-50 pt-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <FiLayers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <select
              required
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
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

        <div>
          <label htmlFor="tag" className="font-medium text-gray-700">
            Tags
          </label>

          <div className="relative mt-1">
            <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              id="tag"
              value={tagInput}
              placeholder="Type a tag and press Enter"
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTag}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm"
              >
                {tag}

                <button type="button" onClick={() => removeTag(tag)}>
                  <FiX size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="originalPrice"
              className="font-medium text-gray-700"
            >
              Original Price <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-1">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                required
                id="originalPrice"
                type="number"
                min={0}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="discountPrice"
              className="font-medium text-gray-700"
            >
              Discount Price <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-1">
              <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                required
                id="discountPrice"
                type="number"
                min={0}
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="stock" className="font-medium text-gray-700">
            Product Stock <span className="text-red-500">*</span>
          </label>

          <div className="relative mt-1">
            <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              id="stock"
              type="number"
              min={0}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="font-medium text-gray-700">
              Event Start Date <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-1">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

              <input
                required
                id="startDate"
                type="date"
                min={today}
                value={startDate}
                onChange={handleStartDate}
                className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="endDate" className="font-medium text-gray-700">
              Event End Date <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-1">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

              <input
                required
                disabled={!startDate}
                id="endDate"
                type="date"
                min={getMinEndDate(startDate)}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full rounded-lg border py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500 ${
                  !startDate
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-50"
                }`}
              />
            </div>

            <p className="mt-1 text-xs text-gray-500">
              End date must be after 3 days of the selected start date.
            </p>
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700">
            Upload Images <span className="text-red-500">*</span>
          </label>

          <label className="mt-2 flex items-center gap-3 cursor-pointer w-fit rounded-lg border px-4 py-2 hover:bg-gray-50 transition">
            <input
              required
              hidden
              multiple
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImages}
            />

            <FiUpload className="text-blue-600" />

            <span className="text-blue-600 font-medium">Upload Images</span>
          </label>

          <p className="text-xs text-gray-500 mt-2">
            Supported formats: JPG, JPEG and PNG.
          </p>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
              {images.map((image) => (
                <div
                  key={image.name}
                  className="relative group overflow-hidden rounded-xl border bg-gray-100"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    width={180}
                    height={180}
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setImages(
                        images.filter(
                          (_, index) => index !== images.indexOf(image),
                        ),
                      )
                    }
                    className="cursor-pointer absolute top-2 right-2 bg-white rounded-full p-1 shadow transition"
                  >
                    <FiX size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            aria-label="Create Event"
            className={`w-full rounded-xl h-10 font-semibold text-white transition-all duration-200
              ${
                loading
                  ? "bg-blue-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              }`}
          >
            {loading ? <ButtonLoader /> : "Create Event"}
          </button>
        </div>
      </form>
    </>
  );
}
