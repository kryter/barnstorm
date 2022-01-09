import { InstrumentSet } from './InstrumentSet';

export interface FlightPlanLeg {
  /**
   * List any feature or bug ticket numbers that related to this
   * specific flight plan leg.
   * This can be useful for context while debugging failures and to
   * help communicate what code changes are covered by tests.
   */
  notes?: string[];

  doTestAction: (instrumentSet: InstrumentSet) => void;
  updateExpectations: (instrumentSet: InstrumentSet) => void;
}
