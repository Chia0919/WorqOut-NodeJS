import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getManager } from "typeorm";
import { AppContext } from "../../../src/utils/appContext";
import {
  ExerciseEntity,
  ExerciseInput,
  SetEntity,
  WorkoutPlanEntity,
  WorkoutPlanInput,
} from "./WorkoutPlanEntity";

@Resolver(() => WorkoutPlanEntity)
export class WorkoutPlanResolver {
  @Mutation(() => Boolean)
  async deleteWorkoutPlan(@Arg("id") id: string) {
    const deleteWorkout = await WorkoutPlanEntity.delete(id);
    return deleteWorkout.affected && deleteWorkout.affected > 0 ? true : false;
  }
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
  @Query(() => [WorkoutPlanEntity])
  // @UseMiddleware(isAuth)
  async getWorkoutPlan(@Arg("id", { nullable: true }) id: string) {
    return id
      ? await WorkoutPlanEntity.find({
          where: { id },
        })
      : await WorkoutPlanEntity.find();
  }

  @FieldResolver()
  async exercise(
    @Root() ex: WorkoutPlanEntity,
    @Ctx() { workoutPlanLoader }: AppContext
  ) {
    return workoutPlanLoader.load(ex.id);
  }
}
@Resolver(() => ExerciseEntity)
export class ExerciseResolver {
  @FieldResolver()
  async set(@Root() set: SetEntity, @Ctx() { setLoader }: AppContext) {
    return setLoader.load(set.id);
  }
}
