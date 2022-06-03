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
    // Do a preflight if needed.
    const preFlight = (flightPlanOrLeg as FlightPlan)?.preFlight;
    if (preFlight) {
      preFlight(instruments);
    }

    // Verify the initial state.
    instruments.verifyState();

    // Fly the flight legs.
    const legs = (flightPlanOrLeg as FlightPlan)?.legs || [flightPlanOrLeg];
    legs.forEach((leg: FlightLeg) => flyLeg(leg, instruments));

    // Do a postflight if needed.
    const postFlight = (flightPlanOrLeg as FlightPlan)?.postFlight;
    if (postFlight) {
      postFlight(instruments);
    }
  };
}

export type FlyFunction = ReturnType<typeof useAirplane>;
