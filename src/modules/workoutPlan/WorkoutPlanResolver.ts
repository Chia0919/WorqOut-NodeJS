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
    @Arg("exerciseInput", () => [ExerciseInput]) exerciseInput: ExerciseInput[]
    // @Arg("setInput", () => [SetInput]) setInput: SetInput[]
  ) {
    const workoutplan = getManager().transaction(async (trans) => {
      const workout: any = await trans
        //.create(WorkoutPlanEntity, workoutInput)
        .save(WorkoutPlanEntity, workoutInput);
      exerciseInput.map((x) => (x.workoutPlanId = workout.id));

      const exercise = await trans
        .createQueryBuilder()
        .insert()
        .into(ExerciseEntity)
        .values(exerciseInput)
        .execute();
      console.log(exercise);

      let Input: any = [];

      for (let i = 0; i < exercise.identifiers.length; i++) {
        for (let j = 0; j < exerciseInput.length; j++) {
          for (let z = 0; z < exerciseInput[j].setInput.length; z++) {
            Input.push({
              createdBy: null,
              exerciseId: exercise.identifiers[j].id,
              set: exerciseInput[j].setInput[z].set,
              kg: exerciseInput[j].setInput[z].kg,
              rep: exerciseInput[j].setInput[z].rep,
            });
          }
        }
        break;
      }
      // let setInput: any = [];
      // exercise.identifiers.forEach((el) => {
      //   for (let i = 0; i < exerciseInput.length; i++) {
      //     exerciseInput[i].setInput.forEach( => {
      //       setInput.push({
      //         createdBy: null,
      //         set: y.set,
      //         kg: y.kg,
      //         rep: y.rep,
      //         exerciseId: el.id,
      //       });
      //     });
      //     if (exerciseInput[i].setInput.length > 1) continue;
      //   }
      // exerciseInput.forEach((x) => {
      //   x.setInput.forEach( => {
      //     setInput.push({
      //       createdBy: null,
      //       set: y.set,
      //       kg: y.kg,
      //       rep: y.rep,
      //       exerciseId: el.id,
      //     });
      //   });
      // });
      //   return;
      // });

      console.log(Input, "test");
      const set = await trans
        .createQueryBuilder()
        .insert()
        .into(SetEntity)
        .values(Input)
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
