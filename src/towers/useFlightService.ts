import { InstrumentSet } from '../InstrumentSet';
import { Airspace } from './Airspace';
import { FlightService } from './FlightService';

export function useFlightService(
  instruments: InstrumentSet,
  airspaces: Airspace[]
): FlightService {
  return new FlightService(instruments, airspaces);
}
