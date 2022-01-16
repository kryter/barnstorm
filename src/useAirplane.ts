import { FlightPlan } from './FlightPlan';
import { InstrumentSet } from './InstrumentSet';
import { FlightLeg } from './FlightLeg';

function flyLeg(leg: FlightLeg, instruments: InstrumentSet) {
  // Do the test action.
  leg.doTestAction(instruments);

  // Update expectations based on the action and verify updated state.
  leg.updateExpectations(instruments);
  instruments.verifyState();
}

export function useAirplane(
  instruments: InstrumentSet
): (flightPlanOrLeg: FlightPlan | FlightLeg) => void {
  return function fly(flightPlanOrLeg: FlightPlan | FlightLeg): void {
    const legs = (flightPlanOrLeg as FlightPlan)?.legs || [flightPlanOrLeg];
    legs.forEach((leg: FlightLeg) => flyLeg(leg, instruments));
  };
}

export type FlyFunction = ReturnType<typeof useAirplane>;
