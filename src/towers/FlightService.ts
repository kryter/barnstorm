import { InstrumentSet } from '../InstrumentSet';
import { Airspace } from './Airspace';

export class FlightService {
  private airspaceIdStack: string[] = [];

  constructor(
    private instruments: InstrumentSet,
    private airspaces: Airspace[]
  ) {}

  private getAirspace(airspaceId: string): Airspace {
    const airspace: Airspace = this.airspaces.find(
      (existingAirspace) => existingAirspace.id === airspaceId
    );
    return airspace;
  }

  public enter(airspaceId: string) {
    const airspace: Airspace = this.getAirspace(airspaceId);
    if (!airspace) {
      throw new Error(
        `Unable to enter airspace.  Flight service unable to find airspace with id ${airspaceId}.  Existing airspace ids are ${this.airspaces
          .map((existingAirspace) => existingAirspace.id)
          .join(', ')}.`
      );
    }

    this.airspaceIdStack.push(airspaceId);

    // Connect all instruments for all towers in the airspace.
    airspace.towers.forEach((tower) => tower.reconnect());

    if (airspace.onEnter) {
      airspace.onEnter(this.instruments);
    }
  }

  private leaveCurrentAirspace() {
    const airspaceId = this.airspaceIdStack.pop();
    const airspace = this.getAirspace(airspaceId);

    // Disconnect all instruments for all towers in the airspace.
    airspace.towers.forEach((tower) => tower.disconnect());

    if (airspace.onLeave) {
      airspace.onLeave(this.instruments);
    }
  }

  public leave(airspaceId: string) {
    const airspace: Airspace = this.getAirspace(airspaceId);
    if (!airspace) {
      throw new Error(
        `Unable to leave airspace.  Flight service unable to find airspace with id ${airspaceId}.  Existing airspace ids are ${this.airspaces
          .map((existingAirspace) => existingAirspace.id)
          .join(', ')}.`
      );
    }

    const airspaceIndex = this.airspaceIdStack.indexOf(airspaceId);
    if (airspaceIndex === -1) {
      throw new Error(
        `Unable to leave airspace ${airspaceId} that was never entered.  Current airspace ids include ${this.airspaceIdStack.join(
          ', '
        )}.`
      );
    }

    for (
      let index = this.airspaceIdStack.length - 1;
      index >= airspaceIndex;
      index -= 1
    ) {
      this.leaveCurrentAirspace();
    }
  }
}
