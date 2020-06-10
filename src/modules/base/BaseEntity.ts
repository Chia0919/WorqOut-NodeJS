import { Field, InterfaceType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// Interface
@InterfaceType()
export abstract class Base extends BaseEntity {
  @Field() //SDL type inout interface GRAPHQL API
  @PrimaryGeneratedColumn("uuid") ///
  id: string;
  @CreateDateColumn({ type: "timestamptz" })
  @Field({ nullable: true })
  createdTs: string;

  @Column("uuid", { nullable: true })
  @Field({ nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: "timestamptz" })
  @Field({ nullable: true })
  modTs: string;

  // UsrId
  @Column("uuid", { nullable: true })
  @Field({ nullable: true })
  modBy: string;
}
