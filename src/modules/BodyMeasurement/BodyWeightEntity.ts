import { Field, InputType, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity } from "typeorm";
import { Base, BaseInput } from "../base/BaseEntity";

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
export class BodyWeightInput extends BaseInput
  implements Partial<BodyWeightEntity> {
  @Field()
  date: Date;

  @Field()
  weight: number;

  @Field()
  fatPercentage: number;
}
