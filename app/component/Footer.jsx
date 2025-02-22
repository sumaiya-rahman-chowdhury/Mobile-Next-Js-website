import { FaHome, FaPhone, FaShoppingCart, FaInfoCircle, FaUser, FaBox, FaShieldAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6 mt-10">
      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
          <div className="text-left">
            <h3 className="font-semibold mb-2">Get to Know Us</h3>
            <a href="/about" className="block hover:text-gray-400">About Us</a>
            <a href="/careers" className="block hover:text-gray-400">Careers</a>
            <a href="/blog" className="block hover:text-gray-400">Blog</a>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">Customer Service</h3>
            <a href="/help" className="block hover:text-gray-400">Help Center</a>
            <a href="/returns" className="block hover:text-gray-400">Returns & Refunds</a>
            <a href="/shipping" className="block hover:text-gray-400">Shipping Info</a>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">Account</h3>
            <a href="/profile" className="block flex items-center gap-2 hover:text-gray-400"><FaUser /> Your Account</a>
            <a href="/orders" className="block flex items-center gap-2 hover:text-gray-400"><FaBox /> Your Orders</a>
            <a href="/security" className="block flex items-center gap-2 hover:text-gray-400"><FaShieldAlt /> Security Settings</a>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">Connect with Us</h3>
            <a href="/contact" className="block flex items-center gap-2 hover:text-gray-400"><FaPhone /> Contact Us</a>
            <a href="/social" className="block hover:text-gray-400">Follow Us</a>
            <a href="/newsletter" className="block hover:text-gray-400">Newsletter</a>
          </div>
        </div>
        <p className="text-sm mt-6">&copy; {new Date().getFullYear()} Mobile Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
