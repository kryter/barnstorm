import { InstrumentSet } from './InstrumentSet';

export interface FlightPlanLeg {
  doTestAction: (instrumentSet: InstrumentSet) => void;
  updateExpectations: (instrumentSet: InstrumentSet) => void;
}
