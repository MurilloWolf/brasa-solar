import { useContext } from "react";
import { CalculatorContext } from "./CalculatorContext";

/**
 *
 * @returns lastCalc State
 * @returns saveLastCacl Function
 */
const useLastCalc = () => {
  const state = useContext(CalculatorContext);

  return state;
};

export default useLastCalc;
