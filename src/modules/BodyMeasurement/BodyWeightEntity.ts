import { Field, InputType, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity } from "typeorm";
import { Base } from "../base/BaseEntity";

@Entity({ name: "BodyWeight" })
@ObjectType({ implements: Base })
export class BodyWeightEntity extends Base {
  @CreateDateColumn({ type: "timestamptz" })
  @Field()
  date: string;

  @Column("numeric")
  @Field()
  weight: number;

  @Column("numeric")
  @Field()
  fatPercentage: number;
}

@InputType()
export class BodyWeightInput implements Partial<BodyWeightEntity> {
  @Field()
  date: string;

  @Field()
  weight: number;

  @Field()
  fatPercentage: number;
}
