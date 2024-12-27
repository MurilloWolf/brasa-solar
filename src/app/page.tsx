"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FileCheck2, Sun, UserCheck, Zap } from "lucide-react";

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import {
  AboutUs,
  Calculator,
  ContactButton,
  ContactForm,
  Footer,
  Header,
} from "@/components/system";
import CalculatorProvider from "@/components/system/Calculator/context/CalculatorContext";
import Autoplay from "embla-carousel-autoplay";

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

  const content = [
    {
      url: "https://energyefficiency.ie/wp-content/uploads/2023/09/Solar-Panels-Maintenance.jpg",
      text: "img1",
    },
    {
      url: "https://coldwellsolar.com/wp-content/uploads/2021/10/designing-commercial-solar-installation.jpg",
      text: "img2",
    },
    {
      url: "https://revistacenarium.com.br/wp-content/uploads/2022/07/whatsapp-image-2022-07-25-at-085410.jpeg",
      text: "img3",
    },
    {
      url: "https://ledclass.com.br/wp-content/uploads/2023/04/Painei-solar.jpg",
      text: "img4",
    },
  ];

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
              <h2 className="font-[verdana] text-center flex-1 text-4xl sm:text-5xl sm:px-4 font-bold text-white">
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
            <p className="text-glow mt-4 text-xl sm:text-2xl text-gray-200 ">
              De um passo em direção à economia e sustentabilidade.
            </p>
            <Link href="#nossos-servicos">
              <Button
                id="btn-see-more"
                className="text-xl mt-6 bg-orange-500 hover:bg-orange-400 text-white py-3 px-6 rounded-sm"
              >
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
        <section id="about" className="py-16 bg-gray-100 px-4 sm:px-6">
          <div className="container mx-auto text-center">
            <h3 className="text-3xl sm:text-2xl sm:text-left lg:text-5xl font-bold text-gray-900">
              Quem Somos
            </h3>
            <p className="flex flex-col sm:flex-row items-center mt-4 text-lg text-gray-700 max-w-4xl mx-auto lg:max-w-full lg:text-2xl lg:text-left w-full">
              Especializados em fornecer soluções de{"   "}
              <span className="font-semibold ml-2 flex">
                {" "}
                energia solar{" "}
                <Sun
                  size={32}
                  className="stroke-orange-600 animate-pulse ml-2"
                />
              </span>{" "}
            </p>
            <p className="mt-4 flex justify-center sm:justify-start gap-2 items-center text-sm sm:text-lg text-orange-600 max-w-4xl mx-auto lg:max-w-full lg:text-md lg:text-left w-full">
              <UserCheck className=" stroke-orange-500 h-5 sm:h-6" /> O melhor
              atendimento do Oeste Paulista.
            </p>
            <p className="flex justify-center sm:justify-start gap-2 items-center text-sm  sm:text-lg text-orange-600 max-w-4xl mx-auto lg:max-w-full lg:text-md lg:text-left w-full">
              <FileCheck2 className="stroke-orange-500 h-5 sm:h-6" /> Seu
              orçamento em até 15min.
            </p>
          </div>
          <div className="w-full flex justify-center items-center py-12 sm:px-12 sm:py-12">
            <Carousel
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
              className="w-full "
            >
              <CarouselContent className="-ml-2">
                {content.map((item) => (
                  <CarouselItem
                    key={item.text}
                    className="pl-1 basis-full md:basis-2/3 lg:basis-2/3 xl:basis-2/4"
                  >
                    <Image
                      src={item.url}
                      width={500}
                      height={600}
                      alt="carousel"
                      className="w-full h-full  md:w-[400px] lg:w-full max-w-lg rounded-lg shadow-md"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Services Section */}

        <AboutUs />
        {/* Contact Section */}

        <ContactForm />
        <ContactButton />
        <Footer />
      </div>
    </CalculatorProvider>
  );
}
