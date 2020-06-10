import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { getManager } from "typeorm";
import {
  ExerciseEntity,
  ExerciseInput,
  SetEntity,
  SetInput,
  WorkoutPlanEntity,
  WorkoutPlanInput,
} from "./WorkoutPlanEntity";

@Resolver(() => WorkoutPlanEntity)
export class WorkoutPlanResolver {
  @Mutation(() => Boolean)
  async addWorkoutPlan(
    @Arg("workoutInput") workoutInput: WorkoutPlanInput,
    @Arg("exerciseInput", () => [ExerciseInput]) exerciseInput: ExerciseInput[],
    @Arg("setInput", () => [SetInput]) setInput: SetInput[]
  ) {
    const workoutplan = getManager().transaction(async (trans) => {
      const workout = await trans.create(WorkoutPlanEntity, {
        ...workoutInput,
      });
      exerciseInput.map((x) => (x.workoutPlanId = workout.id));
      console.log(exerciseInput);
      //   const exercise = await trans
      //     .createQueryBuilder()
      //     .insert()
      //     .into(ExerciseEntity)
      //     .values(exerciseInput)
      //     .execute();
      //   exercise.generatedMaps.map((el: any) => {
      //     setInput.map((el2) => (el2.exerciseId = el));
      //   });
      exerciseInput.map((x) => x.setInput);
      console.log(setInput);
      const set = await trans
        .createQueryBuilder()
        .insert()
        .into(SetEntity)
        .values(setInput)
        .execute();
      return set.generatedMaps.length > 0 ? true : false;
    });
    return workoutplan;
  }
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }
}
