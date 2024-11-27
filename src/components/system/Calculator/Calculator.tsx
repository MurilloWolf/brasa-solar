import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import calculatorSchema, { calculatorInitialValues } from "./schema";
import { calculatePanelsByBill, calculatePanelsByConsumption } from "./utils";
import { useRef, useState } from "react";
import { InfoIcon } from "lucide-react";
import ResultCard from "./components/ResultCard";

export default function Calculator() {
  const [calcSelected, setCalcSelected] = useState("bill");
  const [panelsRequiredBill, setPanelsRequiredBill] = useState(0);
  const [panelsRequiredConsumption, setPanelsRequiredConsumption] = useState(0);
  const resultBillRef = useRef<HTMLDivElement | null>(null);
  const resultConsumptionRef = useRef<HTMLDivElement | null>(null);

  const zform = useForm({
    resolver: zodResolver(calculatorSchema),
    defaultValues: calculatorInitialValues,
  });

  const validateField = (field: string) => {
    // @ts-ignore
    const value = calculatorSchema.pick({ [field]: true });
    const error = value.safeParse({
      [field]: Number(zform.getValues(field as any)),
    });

    if (error.success) {
      zform.clearErrors(field as any);
      return;
    }

    zform.setError(field as any, { message: "Insira um valor válido" });
  };

  const scrollToTarget = (targetRef: React.RefObject<HTMLDivElement>) => {
    if (!targetRef.current) return;

    const targetPosition =
      targetRef.current.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: targetPosition - 100,
      behavior: "smooth",
    });
  };

  const handleCalculatePanels = () => {
    const fieldToValidate = [
      calcSelected === "consumption" ? "consumptionKWh" : "billValue",
      "sunHoursPerDay",
    ];

    fieldToValidate.forEach(validateField);
    const hasError = fieldToValidate.some(
      (field) =>
        zform.formState.errors[field as keyof typeof zform.formState.errors]
    );
    if (hasError) return;

    const values = zform.getValues();
    const panelsRequired =
      calcSelected === "consumption"
        ? calculatePanelsByConsumption({
            consumptionKWh: values.consumptionKWh,
            panelPowerW: values.panelPowerW,
            sunHoursPerDay: values.sunHoursPerDay,
            efficiency: values.efficiency,
          })
        : calculatePanelsByBill({
            billValue: values.billValue,
            panelPowerW: values.panelPowerW,
            sunHoursPerDay: values.sunHoursPerDay,
            efficiency: values.efficiency,
            tariffPerKWh: values.tariffPerKWh,
            flagRate: values.flagRate as "green" | "yellow" | "red" | "red2",
          });

    if (calcSelected === "consumption") {
      setPanelsRequiredConsumption(panelsRequired);
      setTimeout(() => scrollToTarget(resultConsumptionRef), 200);
      return;
    }

    setTimeout(() => scrollToTarget(resultBillRef), 200);
    setPanelsRequiredBill(panelsRequired);
  };

  return (
    <div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Calculadora de placas</CardTitle>
            <CardDescription>
              Descubra quantas placas solares são necessárias para sua
              residência
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bill">
              <TabsList className="w-full justify-start">
                <TabsTrigger
                  value="consumption"
                  onClick={() => setCalcSelected("consumption")}
                >
                  Consumo
                </TabsTrigger>
                <TabsTrigger
                  value="bill"
                  onClick={() => setCalcSelected("bill")}
                >
                  Conta
                </TabsTrigger>
              </TabsList>
              <TabsContent value="consumption">
                <Form {...zform}>
                  <form className="min-h-96 flex flex-col justify-evenly">
                    <FormField
                      name="consumptionKWh"
                      control={zform.control}
                      render={({ field }) => (
                        <FormItem className="w-full md:text-xs">
                          <FormLabel>Consumo de KWh*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="consumptionKWh"
                              placeholder=""
                              type="number"
                            />
                          </FormControl>
                          <FormMessage className="font-extralight" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="sunHoursPerDay"
                      control={zform.control}
                      render={({ field }) => (
                        <FormItem className="w-full md:text-xs">
                          <FormLabel>Horas no sol*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="sunHoursPerDay"
                              placeholder="5"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage className="font-extralight" />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-400 text-gray-50 text-md"
                      type="button"
                      onClick={handleCalculatePanels}
                    >
                      Calcular
                    </Button>
                  </form>
                </Form>
                <ResultCard
                  panelsRequired={panelsRequiredConsumption}
                  ref={resultConsumptionRef}
                />
              </TabsContent>
              <TabsContent value="bill">
                <Form {...zform}>
                  <form className="min-h-96 flex flex-col justify-evenly">
                    <FormField
                      name="billValue"
                      control={zform.control}
                      render={({ field }) => (
                        <FormItem className="w-full md:text-xs">
                          <FormLabel>Valor da conta*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="billValue"
                              placeholder=""
                              type="number"
                            />
                          </FormControl>
                          <FormMessage className="font-extralight" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={zform.control}
                      name="flagRate"
                      render={({ field }) => (
                        <FormItem className="w-full md:text-xs m-4s">
                          <FormLabel className="">Cor da bandeira*</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="p-0 ">
                              <SelectItem value="green">verde</SelectItem>
                              <SelectItem value="yellow">amarelo</SelectItem>
                              <SelectItem value="red">vermelho</SelectItem>
                              <SelectItem value="red2">vermelho 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="sunHoursPerDay"
                      control={zform.control}
                      render={({ field }) => (
                        <FormItem className="w-full md:text-xs">
                          <FormLabel>Horas no sol*</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="sunHoursPerDay"
                              placeholder="5"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage className="font-extralight" />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-400 text-gray-50 text-md"
                      type="button"
                      onClick={handleCalculatePanels}
                    >
                      Calcular
                    </Button>
                  </form>
                </Form>
                <ResultCard
                  panelsRequired={panelsRequiredBill}
                  ref={resultBillRef}
                />
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="text-gray-400 text-xs font-extralight flex gap-2">
            <InfoIcon className="text-gray-300" size={22} />
            Esse cálculo não substitui um orçamento especializado.{" "}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
