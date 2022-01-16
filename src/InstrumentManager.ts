import { Subject, Observable } from 'rxjs';
import { InstrumentConfig } from './instruments/instrument/InstrumentConfig';

export interface InstrumentToCreateEvent {
  instrumentConfig: InstrumentConfig;
}

export interface InstrumentToDestroyEvent {
  instrumentId: string;
}

export class InstrumentManager {
  private instrumentToCreateSubject: Subject<InstrumentToCreateEvent> =
    new Subject<InstrumentToCreateEvent>();

  private instrumentToDestroySubject: Subject<InstrumentToDestroyEvent> =
    new Subject<InstrumentToDestroyEvent>();

  public getInstrumentToCreateObservable(): Observable<InstrumentToCreateEvent> {
    return this.instrumentToCreateSubject.asObservable();
  }

  public getInstrumentsToDestroyObservable(): Observable<InstrumentToDestroyEvent> {
    return this.instrumentToDestroySubject.asObservable();
  }

  public triggerCreateInstrument<TInstrumentConfig extends InstrumentConfig>(
    instrumentConfig: TInstrumentConfig
  ) {
    this.instrumentToCreateSubject.next({
      instrumentConfig,
    });
  }

  public triggerDestroyInstrument(instrumentId: string): void {
    this.instrumentToDestroySubject.next({
      instrumentId,
    });
  }

  public destroy(): void {
    this.instrumentToCreateSubject.complete();
    this.instrumentToDestroySubject.complete();
  }
}
