import { createContext, useState } from "react";
import {
  LastCalcType,
  CalculatorContextType,
  CalculatorProviderProps,
} from "./@types";

const calculatorInitialState = {
  lastCalc: {
    hasBeenUsed: false,
    lastOperation: "",
    value: 0,
    panelsTotal: 0,
  },
  saveLastCalc: (props: LastCalcType) => {},
};

export const CalculatorContext = createContext<CalculatorContextType>(
  calculatorInitialState
);

const CalculatorProvider = (props: CalculatorProviderProps) => {
  const { children } = props;
  const [lastCalc, setLastCalc] = useState(calculatorInitialState.lastCalc);

  const saveLastCalc = (props: LastCalcType) => {
    const { lastOperation, value, panelsTotal } = props;
    setLastCalc({
      hasBeenUsed: true,
      lastOperation,
      value,
      panelsTotal,
    });
  };

  const contextValue = {
    lastCalc,
    saveLastCalc,
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export default CalculatorProvider;
