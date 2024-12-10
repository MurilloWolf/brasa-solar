"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { Button } from "@/components/ui";
import {
  Calculator,
  ContactButton,
  ContactForm,
  Footer,
  Header,
} from "@/components/system";
import CalculatorProvider from "@/components/system/Calculator/context/CalculatorContext";

export default function Home() {
  const [countEffect, setCountEffect] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountEffect((old) => {
        if (old >= 95) {
          clearInterval(intervalId);
          return 95;
        }
        return old + 1;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <CalculatorProvider>
      <div className="bg-gray-500 ">
        <Header />
        <section
          className="bg-cover bg-center h-[500px] sm:h-[550px] relative"
          style={{
            backgroundImage:
              "url('https://www.bv.com.br/documents/1697363/1703895/painel-solar-monocristalino-e-painel-solar-policristalino.jpg/5b6b2ac7-35e4-9d58-d376-0d44341ccf26?t=1716839932009')",
          }}
        >
          <div className="relative z-10 container mx-auto text-center py-16 text-gray-800 px-4 sm:px-0">
            <div className="flex gap-2 ">
              <h2 className="font-[verdana] text-center flex-1 text-4xl sm:text-3xl font-bold text-white">
                Reduza sua conta de luz em até{" "}
              </h2>
            </div>
            <p className="mt-4 text-center  font-extrabold rounded-md text-orange-400 text-8xl">
              <span
                className="p-2 opacity-90"
                style={{
                  textShadow: "0 0 8px black, 0 0 8px orange;",
                }}
              >
                {countEffect}%
              </span>
            </p>
            <p className="text-glow mt-4 text-xl sm:text-lg text-gray-200 ">
              De um passo em direção à economia e sustentabilidade.
            </p>
            <Link href="#nossos-servicos">
              <Button className="text-xl mt-6 bg-orange-500 hover:bg-orange-400 text-white py-3 px-6 ">
                Saiba Mais <Zap />
              </Button>
            </Link>
          </div>
          <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        </section>

        <section id="calculadora" className="py-16 bg-gray-50 px-6">
          <div className="container mx-auto ">
            <Calculator />
          </div>
        </section>
        <section id="about" className="py-16 bg-white px-6">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl sm:text-2xl font-bold text-gray-900">
              Quem Somos
            </h3>
            <p className="mt-4 text-lg text-gray-700 max-w-4xl mx-auto">
              Somos uma empresa especializada em fornecer soluções de energia
              solar, oferecendo a nossos clientes painéis solares de alta
              qualidade, otimização de consumo e um futuro mais sustentável.
              Nossos sistemas são projetados para fornecer energia limpa e
              eficiente para sua casa ou negócio.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="nossos-servicos" className="py-16 bg-gray-100">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl sm:text-2xl font-bold text-gray-900">
              Nossos Serviços
            </h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-orange-600">
                  Instalação de Painéis Solares
                </h4>
                <p className="mt-4 text-gray-700">
                  Instalamos sistemas solares personalizados para atender às
                  suas necessidades de energia.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-orange-600">
                  Manutenção e Suporte
                </h4>
                <p className="mt-4 text-gray-700">
                  Garantimos que seu sistema solar continue operando de forma
                  eficiente ao longo dos anos.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-orange-600">
                  Consultoria Energética
                </h4>
                <p className="mt-4 text-gray-700">
                  Oferecemos consultoria para ajudá-lo a maximizar a eficiência
                  de seus sistemas solares.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}

        <ContactForm />
        <ContactButton />
        <Footer />
      </div>
    </CalculatorProvider>
  );
}
