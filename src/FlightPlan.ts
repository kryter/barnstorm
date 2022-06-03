import { FlightLeg } from './FlightLeg';
import { InstrumentSet } from './InstrumentSet';

export interface FlightPlan {
  /**
   * List any feature or bug ticket numbers that related to this
   * flight plan.
   * This can be useful for context while debugging failures and to
   * help communicate what code changes are covered by tests.
   */
  notes?: string[];

  preFlight?: (instrumentSet: InstrumentSet) => void;

  legs: FlightLeg[];

  postFlight?: (instrumentSet: InstrumentSet) => void;
}
