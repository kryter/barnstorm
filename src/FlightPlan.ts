import { FlightPlanLeg } from './FlightPlanLeg';

export interface FlightPlan {
  description: string;
  legs: FlightPlanLeg[];
}
