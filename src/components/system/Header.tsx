import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#nossos-servicos", text: "Serviços" },
    { href: "#calculadora", text: "Calculadora" },
    { href: "#fale-conosco", text: "Fale conosco" },
  ];

  return (
    <header className="bg-gradient-to-r from-orange-400 via-orange-600  to-orange-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl font-bold">
          <Link href="/">Brasa Solar</Link>
        </h1>
        <nav>
          <ul className="hidden sm:flex space-x-6">
            {links.map((link) => (
              <li key={link.text}>
                <Link href={link.href} className="hover:text-yellow-300">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
          <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
            <SheetTrigger className="flex sm:hidden">
              <Menu />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription className="flex flex-col min-h-52 h-full gap-8 justify-center">
                  {links.map((link) => (
                    <Link
                      id={link.text}
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-center group-hover hover:text-orange-600 text-gray-700 font-bold text-lg "
                    >
                      <p>
                        <strong className="border-b-2 border-transparent hover:border-b-orange-400 transition-all ease-in ">
                          {link.text}
                        </strong>
                      </p>
                    </Link>
                  ))}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
