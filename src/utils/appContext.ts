import { Request, Response } from "express";
import {
  WorkoutPlanLoader,
  SetLoader,
} from "../../src/modules/workoutPlan/DataLoader";

export interface AppContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
  workoutPlanLoader: ReturnType<typeof WorkoutPlanLoader>;
  setLoader: ReturnType<typeof SetLoader>;
}
