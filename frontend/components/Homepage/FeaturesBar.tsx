import { FiTruck, FiGift, FiDollarSign, FiShield } from "react-icons/fi";

export default function FeaturesBar() {
  const features = [
    {
      icon: <FiTruck />,
      title: "Free Shipping",
      subtitle: "From all orders over $100",
    },
    {
      icon: <FiGift />,
      title: "Daily Surprise Offers",
      subtitle: "Save up to 25% off",
    },
    {
      icon: <FiDollarSign />,
      title: "Affordable Prices",
      subtitle: "Get factory direct price",
    },
    {
      icon: <FiShield />,
      title: "Secure Payments",
      subtitle: "100% protected payments",
    },
  ];

  return (
    <section className="hidden mx-auto md:block max-w-11/12 bg-white border-y rounded-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="text-amber-500 text-2xl transition group-hover:scale-110">
                {item.icon}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
