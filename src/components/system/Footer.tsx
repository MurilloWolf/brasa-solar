import { Facebook, Instagram, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="p-4 px-10 flex flex-col justify-evenly gap-4">
          <div className="flex justify-between">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Brasa Solar"
                width={100}
                height={100}
              />
            </Link>
            <nav className="text-left text-sm">
              <p className="text-lg">
                <strong>Social</strong>
              </p>
              <div className="max-w-32 flex flex-col justify-evenly gap-2">
                <p className="flex items-center">
                  <Instagram className="mr-2" size={18} />
                  Instagram
                </p>
                <p className="flex items-center">
                  <Facebook className="mr-2" size={18} />
                  Facebook
                </p>
                <p className="flex items-center">
                  <Phone className="mr-2" size={18} />
                  WhatsApp
                </p>
              </div>
            </nav>
          </div>

          <div className="text-left text-sm">
            <p className="text-lg">
              <strong>Links</strong>
            </p>
            <div className="max-w-48 px-4 flex flex-col justify-evenly gap-2">
              <Link href="#">Calculadora</Link>
              <Link href="#">Fale conosco</Link>
              <Link href="#">Termos de uso</Link>
            </div>
          </div>
        </div>
        <p className="mt-4">
          <small className="text-orange-400">
            &copy; 2024 Brasa Solar. Todos os direitos reservados.
          </small>
        </p>
      </div>
    </footer>
  );
}
