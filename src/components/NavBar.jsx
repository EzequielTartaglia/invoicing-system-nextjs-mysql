import Link from "next/link";

function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white py-3 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        
        <Link href="/">
          <h3 className="text-3xl">Invoicing System</h3>
        </Link>
        
        <ul className="flex space-x-4">
          <li className="pr-4">
            <Link href="/products" className="text-sky-500 hover:text-sky-400">
              Control de stock
            </Link>
          </li>
          <li>
            <Link href="/cart" className="text-sky-500 hover:text-sky-400">
              Sistema de compras
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;