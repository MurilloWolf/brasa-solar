import {
  Carousel,
  CarouselContent,
  CarouselItem,
  Card,
  CardContent,
  CarouselPrevious,
  CarouselNext,
  CardHeader,
} from "@/components/ui";
import Autoplay from "embla-carousel-autoplay";

export default function AboutUs() {
  const content = [
    {
      title: "Instalação de Painéis Solares",
      description:
        "Realizamos a instalação de placas solares personalizados para atender às suas necessidades de energia.",
    },
    {
      title: "Manutenção e Suporte",
      description:
        "Garantimos que seu sistema solar continue operando de formaeficiente ao longo dos anos.",
    },
    {
      title: "Consultoria Energética",
      description:
        "Oferecemos consultoria para ajudá-lo a maximizar a eficiência de seus sistemas solares.",
    },
  ];
  return (
    <>
      <section
        id="nossos-servicos"
        className="block sm:hidden md:hidden lg:block py-16 bg-white"
      >
        <div className="container mx-auto text-center">
          <h3 className="text-3xl sm:text-2xl lg:text-4xl font-bold text-gray-900">
            Nossos Serviços
          </h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-orange-600">
                Instalação de Painéis Solares
              </h4>
              <p className="mt-4 text-gray-700">
                Instalamos sistemas solares personalizados para atender às suas
                necessidades de energia.
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
                Oferecemos consultoria para ajudá-lo a maximizar a eficiência de
                seus sistemas solares.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="nossos-servicos"
        className="hidden bg-gray-100 sm:block lg:hidden py-8 px-6 "
      >
        <h3 className="text-3xl sm:text-2xl font-bold text-gray-900 py-4">
          Nossos Serviços
        </h3>
        <div className="flex justify-center items-center w-full">
          <Carousel
            plugins={[
              Autoplay({
                delay: 10000,
              }),
            ]}
            className="w-full max-w-2xl"
          >
            <CarouselContent className="-ml-2">
              {content.map((item) => (
                <CarouselItem
                  key={item.title}
                  className="pl-1 md:basis-2/3 lg:basis-2/3"
                >
                  <Card className="h-auto w-96">
                    <CardHeader className="text-orange-600 text-xl font-bold">
                      {item.title}
                    </CardHeader>
                    <CardContent>{item.description}</CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </>
  );
}
