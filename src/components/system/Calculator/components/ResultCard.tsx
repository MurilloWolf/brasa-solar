import { InfoIcon } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

type ResultCardProps = {
  panelsRequired: number;
  ref: React.RefObject<HTMLDivElement>;
};

export default function ResultCard(props: ResultCardProps) {
  const { panelsRequired, ref } = props;

  if (panelsRequired === 0 || !panelsRequired) return null;

  return (
    <>
      <Card
        className="bg-gradient-to-r from-orange-500 to-yellow-400"
        ref={ref}
      >
        <CardHeader>
          <CardTitle className="text-white flex justify-between items-center">
            Mínimo de
          </CardTitle>
        </CardHeader>
        <CardContent className=" ">
          <CardDescription className="text-center text-gray-100 ">
            <p className="text-8xl text-white font-bold">{panelsRequired}</p>
          </CardDescription>
          <CardDescription className="text-center text-gray-100 ">
            <p className="text-xl font-semibold">
              <br />
              placas solares
            </p>
            <p className="text-center">Para atender ao seu consumo</p>
          </CardDescription>
        </CardContent>
      </Card>
      {/* <p className="text-gray-400 text-xs font-extralight p-2 flex gap-2">
        <InfoIcon className="text-gray-300" size={22} />
        Esse cálculo não substitui um orçamento especializado.{" "}
      </p> */}
    </>
  );
}
