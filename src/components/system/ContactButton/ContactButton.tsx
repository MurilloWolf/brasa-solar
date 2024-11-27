import { Button } from "@/components/ui";
import { CircleDollarSign } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactButton() {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-black/80 flex justify-center items-center p-4 py-8 pb-12">
      <Button className="bg-orange-500 hover:bg-orange-400 w-full text-lg ">
        Solicitar orçamento <CircleDollarSign />
      </Button>
    </div>
  );
}
