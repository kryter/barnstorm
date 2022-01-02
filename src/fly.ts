import { FlightPlan } from './FlightPlan';
import { InstrumentSet } from './InstrumentSet';
import { FlightPlanLeg } from './FlightPlanLeg';

export function fly(
  instrumentSet: InstrumentSet,
  flightPlan: FlightPlan
): void {
  // Verify initial state.
  instrumentSet.verifyState();

  flightPlan.legs.forEach((leg: FlightPlanLeg) => {
    // Do the test action.
    leg.doTestAction(instrumentSet);

    // Update expectations based on the action and verify updated state.
    leg.updateExpectations(instrumentSet);
    instrumentSet.verifyState();
  });
}
