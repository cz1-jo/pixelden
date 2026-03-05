import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-black bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan bg-clip-text text-transparent">
              PixelDen
            </span>
            <p className="mt-3 text-sm text-gray-400">
              Your ultimate destination for games, gear, and gaming lifestyle.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Shop</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/games" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Games</Link></li>
              <li><Link href="/apparel" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Apparel</Link></li>
              <li><Link href="/accessories" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Support</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-gray-400">FAQ</span></li>
              <li><Link href="/shipping" className="text-sm text-gray-400 hover:text-neon-purple transition-colors">Shipping</Link></li>
              <li><span className="text-sm text-gray-400">Returns</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Connect</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="text-sm text-gray-400">Discord</span></li>
              <li><span className="text-sm text-gray-400">Twitter</span></li>
              <li><span className="text-sm text-gray-400">YouTube</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">&copy; 2026 PixelDen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
