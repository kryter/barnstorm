import { InstrumentSet } from './InstrumentSet';

export interface FlightLeg {
  /**
   * List any feature or bug ticket numbers that are
   * related to this specific flight leg.
   * This can be useful for context while debugging failures or
   * to help communicate context for next test runs.
   */
  notes?: string[];

  doTestAction: (instrumentSet: InstrumentSet) => void;

  updateExpectations: (instrumentSet: InstrumentSet) => void;
}
