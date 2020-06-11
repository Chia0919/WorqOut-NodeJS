import DataLoader from "dataloader";
import { WorkoutPlanEntity, ExerciseEntity } from "./WorkoutPlanEntity";

//batch call
export const ExerciseWorkouts = async (ids: string[]) => {
  const workouts = await WorkoutPlanEntity.createQueryBuilder("wp")
    .leftJoinAndSelect("wp.exercise", "exerc")
    .where("wp.id IN (:...ids)", { ids })
    .getMany();
  return workouts.map((wp) => wp.exercise);
};

export const WorkoutPlanLoader = () => new DataLoader(ExerciseWorkouts as any);

export const SetExercises = async (ids: string[]) => {
  const exerc = await ExerciseEntity.createQueryBuilder("ex")
    .leftJoinAndSelect("ex.set", "exe")
    .where("ex.id IN (:...ids)", { ids })
    .getMany();
  return exerc.map((ex) => ex.set);
};

export const SetLoader = () => new DataLoader(SetExercises as any);
