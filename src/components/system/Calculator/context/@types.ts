export type LastCalcType = {
  hasBeenUsed: boolean;
  lastOperation: "bill" | "consumption" | string;
  value: number;
  panelsTotal: number;
};

export type CalculatorContextType = {
  lastCalc: LastCalcType;
  saveLastCalc: Function;
};

export type CalculatorProviderProps = {
  children: React.ReactNode;
};
