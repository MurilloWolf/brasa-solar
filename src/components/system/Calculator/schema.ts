import { z } from "zod";

const flagRate = ["green", "yellow", "red", "red2"] as const;

const calculatorSchema = z.object({
  billValue: z.number().min(1).nonnegative(),
  consumptionKWh: z.number().min(0).optional(),
  sunHoursPerDay: z.number().min(1).max(13).nonnegative(),
  panelPowerW: z.number().min(0).optional(),
  efficiency: z.number().min(0).max(1).optional(),
  tariffPerKWh: z.number().min(0).optional(),
  flagRate: z.enum(flagRate).optional(),
});

const calculatorInitialValues = {
  billValue: 50,
  consumptionKWh: 100,
  sunHoursPerDay: 1,
  panelPowerW: 400,
  efficiency: 0.8,
  tariffPerKWh: 0.83,
  flagRate: "yellow",
};

export default calculatorSchema;
export { calculatorInitialValues };
