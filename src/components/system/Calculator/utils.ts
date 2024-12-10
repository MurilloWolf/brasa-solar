export type CalculateByConsumption = {
  consumptionKWh: number;
  panelPowerW: number;
  sunHoursPerDay: number;
  efficiency: number;
};

export type CalculateByBill = {
  billValue: number;
  panelPowerW: number;
  sunHoursPerDay: number;
  efficiency: number;
  tariffPerKWh: number;
  flagRate: "green" | "yellow" | "red" | "red2";
};

/**
 * @param props
 * @returns number
 * @param consumptionKWh Consumption monthly in kWh
 * @param panelPowerW Power of the panel in W
 * @param sunHoursPerDay Sun hours per day
 * @param efficiency Efficiency of the panel (between 0 and 1)
 */
export function calculatePanelsByConsumption(
  props: CalculateByConsumption
): number {
  const { consumptionKWh, panelPowerW, sunHoursPerDay, efficiency } = props;
  const daysInMonth = 30;
  const monthlyGenerationPerPanel =
    (panelPowerW * sunHoursPerDay * efficiency * daysInMonth) / 1000; // kWh por placa/mês
  const panelsRequired = Math.ceil(consumptionKWh / monthlyGenerationPerPanel);
  return panelsRequired;
}

/**
 *
 * @param billValue bill value in R$
 * @param panelPowerW
 * @param sunHoursPerDay
 * @param efficiency
 * @param tariffPerKWh
 * @returns
 */
export function calculatePanelsByBill(props: CalculateByBill): number {
  const {
    billValue,
    panelPowerW,
    sunHoursPerDay,
    efficiency,
    tariffPerKWh,
    flagRate,
  } = props;

  const flagRatesValues = {
    green: 0,
    yellow: 2.92,
    red: 4.46,
    red2: 7.88,
  };

  const consumptionKWh =
    billValue / (tariffPerKWh + flagRatesValues[flagRate] / 100);

  return calculatePanelsByConsumption({
    consumptionKWh,
    panelPowerW,
    sunHoursPerDay,
    efficiency,
  });
}
