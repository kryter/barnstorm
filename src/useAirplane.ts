import { FlightPlan } from './FlightPlan';
import { InstrumentSet } from './InstrumentSet';
import { FlightLeg } from './FlightLeg';

export function useAirplane(
  instrumentSet: InstrumentSet
): (flightPlan: FlightPlan) => void {
  return function fly(flightPlan: FlightPlan): void {
    flightPlan.legs.forEach((leg: FlightLeg) => {
      // Do the test action.
      leg.doTestAction(instrumentSet);

      // Update expectations based on the action and verify updated state.
      leg.updateExpectations(instrumentSet);
      instrumentSet.verifyState();
    });
  };
}
