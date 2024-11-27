import {
  calculatePanelsByConsumption,
  calculatePanelsByBill,
  CalculateByConsumption,
  CalculateByBill,
} from "../utils"; // replace with the actual file path
describe("Calculator Utils", () => {
  describe("calculatePanelsByConsumption", () => {
    it("should calculate the correct number of panels needed based on consumption", () => {
      const props: CalculateByConsumption = {
        consumptionKWh: 300, // Monthly consumption in kWh
        panelPowerW: 350, // Panel power in W
        sunHoursPerDay: 5, // Sun hours per day
        efficiency: 0.85, // Efficiency of the panel
      };

      const result = calculatePanelsByConsumption(props);
      // Expected value can be manually calculated based on the formula:
      const monthlyGenerationPerPanel = (350 * 5 * 0.85 * 30) / 1000; // kWh per month per panel
      const expectedPanels = Math.ceil(300 / monthlyGenerationPerPanel);

      expect(result).toBe(expectedPanels);
    });

    it("should return 0 panels if the consumption is 0", () => {
      const props: CalculateByConsumption = {
        consumptionKWh: 0,
        panelPowerW: 350,
        sunHoursPerDay: 5,
        efficiency: 0.85,
      };

      const result = calculatePanelsByConsumption(props);
      expect(result).toBe(0);
    });

    it("should return 2 panel for minimal consumption", () => {
      const props: CalculateByConsumption = {
        consumptionKWh: 50,
        panelPowerW: 350,
        sunHoursPerDay: 5,
        efficiency: 0.85,
      };

      const result = calculatePanelsByConsumption(props);
      expect(result).toBe(2);
    });
  });

  describe("calculatePanelsByBill", () => {
    it("should calculate the correct number of panels based on bill value", () => {
      const props: CalculateByBill = {
        billValue: 500, // Bill in R$
        panelPowerW: 350, // Panel power in W
        sunHoursPerDay: 5, // Sun hours per day
        efficiency: 0.85, // Efficiency of the panel
        tariffPerKWh: 0.75, // Tariff per kWh in R$
        flagRate: "yellow", // Flag rate for energy consumption
      };

      const result = calculatePanelsByBill(props);

      const flagRatesValues = {
        green: 0,
        yellow: 2.92,
        red: 4.46,
        red2: 7.88,
      };

      const consumptionKWh =
        props.billValue /
        (props.tariffPerKWh + flagRatesValues[props.flagRate] / 100);

      // Now use the result of the above to calculate the expected number of panels
      const expectedPanels = calculatePanelsByConsumption({
        consumptionKWh,
        panelPowerW: props.panelPowerW,
        sunHoursPerDay: props.sunHoursPerDay,
        efficiency: props.efficiency,
      });

      expect(result).toBeCloseTo(expectedPanels);
    });

    it("should handle the case where the flag rate is green", () => {
      const props: CalculateByBill = {
        billValue: 500,
        panelPowerW: 350,
        sunHoursPerDay: 5,
        efficiency: 0.85,
        tariffPerKWh: 0.75,
        flagRate: "green",
      };

      const result = calculatePanelsByBill(props);

      const flagRatesValues = {
        green: 0,
        yellow: 2.92,
        red: 4.46,
        red2: 7.88,
      };

      const consumptionKWh =
        props.billValue /
        (props.tariffPerKWh + flagRatesValues[props.flagRate] / 100);

      const expectedPanels = calculatePanelsByConsumption({
        consumptionKWh,
        panelPowerW: props.panelPowerW,
        sunHoursPerDay: props.sunHoursPerDay,
        efficiency: props.efficiency,
      });

      expect(result).toBeCloseTo(expectedPanels);
    });

    it("should handle different flag rates correctly", () => {
      const props: CalculateByBill = {
        billValue: 600,
        panelPowerW: 400,
        sunHoursPerDay: 6,
        efficiency: 0.8,
        tariffPerKWh: 0.9,
        flagRate: "yellow",
      };

      const result = calculatePanelsByBill(props);

      const flagRatesValues = {
        green: 0,
        yellow: 2.92,
        red: 4.46,
        red2: 7.88,
      };

      const consumptionKWh =
        props.billValue /
        (props.tariffPerKWh + flagRatesValues[props.flagRate] / 100);

      const expectedPanels = calculatePanelsByConsumption({
        consumptionKWh,
        panelPowerW: props.panelPowerW,
        sunHoursPerDay: props.sunHoursPerDay,
        efficiency: props.efficiency,
      });

      expect(result).toBeCloseTo(expectedPanels);
    });
  });
});
