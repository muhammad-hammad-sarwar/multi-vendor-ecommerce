"use client";
import { useState } from "react";
import { FiX, FiPlus, FiMapPin, FiHome, FiBriefcase } from "react-icons/fi";

interface Props {
  open: boolean;
  onClose: () => void;
}

const countries = [
  {
    name: "Pakistan",
    cities: ["Lahore", "Karachi", "Islamabad"],
  },
  {
    name: "India",
    cities: ["Delhi", "Mumbai", "Bangalore"],
  },
  {
    name: "UAE",
    cities: ["Dubai", "Abu Dhabi"],
  },
];

export default function AddressDetails() {
  const [open, setOpen] = useState(false);

  const addresses = [
    {
      id: 1,
      type: "Home",
      address1: "Street 12",
      address2: "Block B",
      city: "Lahore",
      country: "Pakistan",
      zipCode: "54000",
    },
  ];

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">My Addresses</h2>

          <button
            onClick={() => setOpen(true)}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiPlus />
            Add New
          </button>
        </div>

        <div className="grid gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                {address.type === "Home" ? (
                  <FiHome className="text-blue-600" />
                ) : (
                  <FiBriefcase className="text-blue-600" />
                )}

                <span className="font-medium">{address.type}</span>
              </div>

              <div className="flex items-start gap-2 text-gray-600">
                <FiMapPin className="mt-1 shrink-0" />

                <p className="text-sm leading-6">
                  {address.address1}, {address.address2}
                  <br />
                  {address.city}, {address.country}
                  <br />
                  ZIP: {address.zipCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && <AddAddressModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}

function AddAddressModal({ open, onClose }: Props) {
  const [country, setCountry] = useState("");
  const selectedCountry = countries.find((item) => item.name === country);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-xl font-semibold">Add New Address</h3>

          <button onClick={onClose} className="cursor-pointer">
            <FiX size={22} />
          </button>
        </div>

        <form className="p-5 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium"
              >
                Country
              </label>

              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 bg-gray-50"
              >
                <option value="">Select Country</option>

                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium">
                City
              </label>

              <select
                id="city"
                disabled={!country}
                className="w-full border rounded-lg px-4 py-3 bg-gray-50 disabled:bg-gray-100"
              >
                <option value="">Select City</option>

                {selectedCountry?.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="address1"
              className="block mb-2 text-sm font-medium"
            >
              Address Line 1
            </label>

            <input
              id="address1"
              type="text"
              className="w-full border rounded-lg px-4 py-3 bg-gray-50"
            />
          </div>

          <div>
            <label
              htmlFor="address2"
              className="block mb-2 text-sm font-medium"
            >
              Address Line 2
            </label>

            <input
              id="address2"
              type="text"
              className="w-full border rounded-lg px-4 py-3 bg-gray-50"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="zipCode"
                className="block mb-2 text-sm font-medium"
              >
                Zip Code
              </label>

              <input
                id="zipCode"
                type="text"
                className="w-full border rounded-lg px-4 py-3 bg-gray-50"
              />
            </div>

            <div>
              <label
                htmlFor="addressType"
                className="block mb-2 text-sm font-medium"
              >
                Address Type
              </label>

              <select
                id="addressType"
                className="w-full border rounded-lg px-4 py-3 bg-gray-50"
              >
                <option value="default">Default</option>
                <option value="home">Home</option>
                <option value="office">Office</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
}
