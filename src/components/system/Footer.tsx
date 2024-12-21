import { Instagram, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="p-4 px-10 flex flex-col justify-evenly gap-4">
          <div className="flex justify-between">
            <Link href="/">
              <Image
                src={logo}
                alt="Brasa Solar, empresa de venda e instalação de placas solares"
                width={64}
                height={64}
              />
            </Link>
            <nav className="text-left text-sm">
              <p className="text-lg">
                <strong>Social</strong>
              </p>
              <div className="max-w-32 flex flex-col justify-evenly gap-2">
                <Link
                  href="https://www.instagram.com/brasasolar_/"
                  target="_blank"
                >
                  <p className="flex items-center">
                    <Instagram className="mr-2" size={18} />
                    Instagram
                  </p>
                </Link>
                <Link href="https://wa.me/5518996556202" target="_blank">
                  <p className="flex items-center">
                    <Phone className="mr-2" size={18} />
                    WhatsApp
                  </p>
                </Link>
              </div>
            </nav>
          </div>

          <div className="text-left text-sm">
            <p className="text-lg">
              <strong>Links</strong>
            </p>
            <div className="max-w-48 px-4 flex flex-col justify-evenly gap-2">
              <Link href="#calculadora">Calculadora</Link>
              <Link href="#fale-conosco">Fale conosco</Link>
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
