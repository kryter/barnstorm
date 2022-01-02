export interface FlightPlanLeg {
  description: string;
  doTestAction: () => void;
  updateExpectations: () => void;
}
