"use client";
import { useState } from "react";
import {
  FiX,
  FiPlus,
  FiMapPin,
  FiHome,
  FiBriefcase,
  FiTrash,
} from "react-icons/fi";
import { Country, State, City } from "country-state-city";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import LoadingDots from "@/components/Common/LoadingDots";
import {
  deleteUserProfileAddress,
  updateUserProfileAddresses,
} from "@/redux/actions/user";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";

interface Props {
  open: boolean;
  onClose: () => void;
}

const countries = Country.getAllCountries();
export default function AddressDetails() {
  const [open, setOpen] = useState(false);
  const { user, loading, error } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleDelete = (id) => {
    dispatch(deleteUserProfileAddress(id));
  };

  if (loading || (!error && !user))
    return <LoadingDots text="Loading Addresses data..." />;

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
          {user?.addresses?.length == 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center">
              <FiMapPin className="text-5xl text-gray-400 mb-4" />

              <h3 className="text-lg font-semibold text-gray-800">
                No addresses yet
              </h3>

              <p className="mt-2 text-sm text-gray-500 max-w-sm">
                You haven't added any delivery addresses. Add one to make
                checkout faster.
              </p>
            </div>
          ) : (
            user?.addresses.map((address) => (
              <div
                key={address?._id}
                className="relative bg-white border rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  {address.addressType === "Home" ? (
                    <FiHome className="text-blue-600" />
                  ) : (
                    <FiBriefcase className="text-blue-600" />
                  )}

                  <span className="font-medium">{address.addressType}</span>
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

                <button
                  onClick={() => handleDelete(address?._id)}
                  className=""
                  title={`Delete ${address.addressType.toLocaleUpperCase()} Address`}
                >
                  <FiTrash className="absolute top-5 right-5 text-red-600 cursor-pointer hover:scale-110 transition" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {open && <AddAddressModal open={open} onClose={() => setOpen(false)} />}
    </>
  );
}

function AddAddressModal({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addressType, setAddressType] = useState("Default");
  const { profileLoading } = useAppSelector((state) => state.user);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUserProfileAddresses({
        addressType,
        address1,
        address2,
        country,
        city,
        zipCode,
      }),
    ).then(onClose);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-xl font-semibold">Add New Address</h3>

          <button onClick={onClose} className="cursor-pointer">
            <FiX size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
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
                  <option key={country.isoCode} value={country.isoCode}>
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
                value={city}
                onChange={(e) => setCity(e.target.value)}
                id="city"
                disabled={!country}
                className="w-full border rounded-lg px-4 py-3 bg-gray-50 disabled:bg-gray-100"
              >
                <option value="">Select City</option>

                {City.getCitiesOfCountry(country)?.map((city) => (
                  <option
                    key={`${city?.stateCode} ${city.name} ${city.countryCode}`}
                    value={city?.name}
                  >
                    {city?.name}
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
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
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
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
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
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
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
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
                id="addressType"
                className="w-full border rounded-lg px-4 py-3 bg-gray-50"
              >
                <option value="Default">Default</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-42 cursor-pointer border-2 bg-blue-600 text-white px-6 h-12 rounded-lg font-medium"
          >
            {profileLoading ? <ButtonLoader /> : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  );
}
