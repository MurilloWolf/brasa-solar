import { Button } from "@/components/ui";
import { CircleDollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import useLastCalc from "../Calculator/context/useLastCalc";

export default function ContactButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { lastCalc } = useLastCalc();

  const whatsappNumber = "5518996556202";

  const messages = {
    default: `Olá, gostaria de solicitar um orçamento para instalação de placas solares. `,
    consumption: `Meu consumo mensal é de mais ou menos ${lastCalc.value}KWh`,
    bill: `Minha conta de luz é de mais ou menos R$${
      Math.floor(lastCalc.value * 100) / 100
    }`,
  };

  const getWhatsAppMessage = () => {
    if (lastCalc.hasBeenUsed) {
      return (
        messages.default +
        messages[lastCalc.lastOperation as keyof typeof messages]
      );
    }

    return messages.default;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 900) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (!isVisible) return null;

  const handleRedirectWhatsApp = () => {
    const message = getWhatsAppMessage();
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/90 flex justify-center items-center p-4 py-8 pb-12">
      <Button
        id="btn-contact"
        className="bg-orange-500 hover:bg-orange-400 w-full text-lg "
        onClick={handleRedirectWhatsApp}
      >
        Solicitar orçamento <CircleDollarSign />
      </Button>
    </div>
  );
}
