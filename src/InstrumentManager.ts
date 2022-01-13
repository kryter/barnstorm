import { Subject, Observable } from 'rxjs';
import { InstrumentOptions } from './instruments/instrument/InstrumentOptions';

export interface InstrumentToCreateEvent {
  instrumentOptions: InstrumentOptions;
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

  public triggerCreateInstrument<TInstrumentOptions extends InstrumentOptions>(
    instrumentOptions: TInstrumentOptions
  ) {
    this.instrumentToCreateSubject.next({
      instrumentOptions,
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
