import { Subject, Observable } from 'rxjs';
import { InstrumentOptions } from './InstrumentOptions';

export interface InstrumentSetupEvent {
  instrumentOptions: InstrumentOptions<unknown>;
}

export interface InstrumentTeardownEvent {
  instrumentId: string;
}

export class InstrumentManager {
  private instrumentSetupSubject: Subject<InstrumentSetupEvent> =
    new Subject<InstrumentSetupEvent>();

  private instrumentTeardownSubject: Subject<InstrumentTeardownEvent> =
    new Subject<InstrumentTeardownEvent>();

  public getInstrumentSetupObservable(): Observable<InstrumentSetupEvent> {
    return this.instrumentSetupSubject.asObservable();
  }

  public getInstrumentTeardownObservable(): Observable<InstrumentTeardownEvent> {
    return this.instrumentTeardownSubject.asObservable();
  }

  public setupInstrument<TInstrumentOptions extends InstrumentOptions<unknown>>(
    instrumentOptions: TInstrumentOptions
  ) {
    this.instrumentSetupSubject.next({
      instrumentOptions,
    });
  }

  public teardownInstrument(instrumentId: string): void {
    this.instrumentTeardownSubject.next({
      instrumentId,
    });
  }

  public destroy(): void {
    this.instrumentSetupSubject.complete();
    this.instrumentTeardownSubject.complete();
  }
}
