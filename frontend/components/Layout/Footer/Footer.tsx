import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-lg font-semibold mb-4">ShopO</h2>
          <p className="text-sm text-gray-400">
            The home and elements needed to create beautiful products.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-gray-400">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>About us</li>
            <li>Careers</li>
            <li>Store Locations</li>
            <li>Our Blog</li>
            <li>Reviews</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Game & Video</li>
            <li>Phone & Tablets</li>
            <li>Computers & Laptop</li>
            <li>Sport Watches</li>
            <li>Events</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>FAQ</li>
            <li>Reviews</li>
            <li>Contact Us</li>
            <li>Shipping</li>
            <li>Live Chat</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          {/* Left */}
          <p>© 2026 ShopO. All rights reserved.</p>

          {/* Center */}
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
          </div>

          {/* Right (Payments) */}
          <div className="flex items-center gap-3 text-lg">
            <FaCcVisa />
            <FaCcMastercard />
            <FaPaypal />
          </div>
        </div>
      </div>
    </footer>
  );
}
