import { useAppSelector } from "@/redux/hooks/hooks";
import { City, Country } from "country-state-city";
import { useEffect, useState } from "react";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";
import { IAddress } from "@/redux/slices/user";
import { toast } from "react-toastify";

const countries = Country.getAllCountries();
export default function ShippingForm({
  totalPrice,
  subTotalPrice,
  setStep,
  shippingCost,
}: {
  totalPrice: number;
  subTotalPrice: number;
  setStep: (n: number) => void;
  shippingCost: number;
}) {
  const { user } = useAppSelector((state) => state.user);
  const { totalDiscount } = useAppSelector((state) => state.coupon);
  const [fullName, setFullName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<null | IAddress>(null);

  useEffect(() => {
    setEmail(user?.email ?? "");
    setFullName(user?.name ?? "");
    setPhone(user?.phoneNumber ?? "");
  }, [user]);

  const handleSelectAddress = (address: IAddress) => {
    setSelectedAddress(address);
    setAddress1(address?.address1);
    setAddress2(address?.address2);
    setZipCode(address?.zipCode);
    setCity(address?.city);
    setCountry(address?.country);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <h2 className="text-2xl font-semibold mb-8">Shipping Information</h2>

      <form className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>

          <div className="relative mt-1">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
              aria-label="Email address"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700"
          >
            Full name
          </label>

          <div className="relative mt-1">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
              aria-label="Full name"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone-number"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="relative mt-1">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              autoComplete="tel"
              required
              id="phone-number"
              type="tel"
              value={phone}
              placeholder="+92-300-0000000"
              minLength={15}
              maxLength={15}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="country" className="block mb-2 text-sm font-medium">
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

        <div>
          <label htmlFor="address1" className="block mb-2 text-sm font-medium">
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
          <label htmlFor="address2" className="block mb-2 text-sm font-medium">
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

        <div>
          <label htmlFor="zipCode" className="block mb-2 text-sm font-medium">
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
      </form>

      {user && user?.addresses?.length > 0 && (
        <h2 className="mt-2 font-bold">Choose From saved address</h2>
      )}

      {user &&
        user?.addresses?.map((add) => (
          <div key={add?._id} className="flex items-center space-x-2">
            <input
              checked={selectedAddress?._id == add?._id}
              id={add._id}
              type="radio"
              onChange={() => handleSelectAddress(add)}
            />
            <label htmlFor={add._id}>{add.addressType}</label>
          </div>
        ))}

      <button
        onClick={() => {
          if (
            !email ||
            !phone ||
            !fullName ||
            !country ||
            !city ||
            !zipCode ||
            !address1 ||
            !address2
          ) {
            toast.error("All fields are required");
            return;
          }

          const shippingInfo = { address1, address2, zipCode, country, city };
          const orderData = {
            email,
            shippingCost,
            phone,
            fullName,
            totalPrice,
            subTotalPrice,
            shippingInfo,
            discount: totalDiscount,
            user,
          };

          localStorage.setItem("orderData", JSON.stringify(orderData));
          setStep(2);
        }}
        className="cursor-pointer mt-8 h-12 px-8 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Continue to Payment
      </button>
    </div>
  );
}
