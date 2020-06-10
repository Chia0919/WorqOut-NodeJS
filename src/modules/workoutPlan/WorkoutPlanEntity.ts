import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../base/BaseEntity";

@ObjectType({ implements: Base })
@Entity({ name: "WorkoutPlan" })
export class WorkoutPlanEntity extends Base {
  @Field()
  @Column("varchar", { length: 10 })
  days: string;

  @Field()
  @Column("varchar", { length: 100 })
  workoutName: string;
  @Field()
  @Column("varchar")
  workoutNote: string;

  @Field(() => [ExerciseEntity])
  @OneToMany(() => ExerciseEntity, (exercise) => exercise.workoutPlan)
  exercise: ExerciseEntity[];

  // @Field() name(@Root() parent: SubscriptionAccountEntity): string {
  //     return `${parent.Name} ${parent.AccountNo}`;
  //   }
}
@ObjectType({ implements: Base })
@Entity({ name: "Exercise" })
export class ExerciseEntity extends Base {
  @Field()
  @Column("varchar", { length: 100 })
  name: string;
  @Field()
  @Column("uuid")
  workoutPlanId: string;
  @ManyToOne(() => WorkoutPlanEntity, (workout) => workout.exercise)
  @JoinColumn({ name: "workoutPlanId" })
  @Field(() => WorkoutPlanEntity)
  workoutPlan: WorkoutPlanEntity;
  @Field(() => [SetEntity])
  @OneToMany(() => SetEntity, (set) => set.exercise)
  set: SetEntity[];
}
@ObjectType({ implements: Base })
@Entity({ name: "Set" })
export class SetEntity extends Base {
  @Field()
  @Column("numeric")
  set: number;
  @Field()
  @Column("numeric")
  kg: number;
  @Field()
  @Column("numeric")
  rep: number;
  @Field()
  @Column("uuid")
  exerciseId: string;

  @ManyToOne(() => ExerciseEntity, (workout) => workout.set)
  @JoinColumn({ name: "exerciseId" })
  @Field(() => ExerciseEntity)
  exercise: ExerciseEntity;
}
@InputType()
export class WorkoutPlanInput implements Partial<WorkoutPlanEntity> {
  @Field()
  days: string;

  @Field()
  workoutName: string;

  @Field()
  workoutNote: string;
}
@InputType()
export class ExerciseInput implements Partial<ExerciseEntity> {
  @Field()
  name: string;
  @Field({ nullable: true })
  workoutPlanId: string;
  @Field(() => [SetInput])
  setInput: SetInput[];
}
@InputType()
export class SetInput implements Partial<SetEntity> {
  @Field()
  set: number;
  @Field()
  kg: number;
  @Field()
  rep: number;
  @Field({ nullable: true })
  exerciseId: string;
}
