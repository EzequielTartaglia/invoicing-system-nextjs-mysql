// components/Footer.js

import Link from "next/link";


const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white p-1 text-center fixed bottom-0 w-full">
      <p>Powered by <Link href={"https://www.linkedin.com/in/ezequieltartaglia/"}><span className="text-sky-500 hover:text-sky-400">Ezequiel M. Tartaglia</span></Link></p>
    </footer>
  );
};

export default Footer;
