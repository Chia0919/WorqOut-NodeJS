import {
  ClassType,
  Resolver,
  Mutation,
  UseMiddleware,
  Arg,
  Query,
} from "type-graphql";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

// Create an Entity BaseResolver --> (reusable)
export default function CreateResolver<
  T extends ClassType,
  X extends ClassType
>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("input", () => inputType) data: any) {
      return entity.create(data).save();
    }
  }
  return BaseResolver;
}

// Find Result by ID of an Entity BaseResolver --> (reusable)
export function ReadResolver<T extends ClassType>(
  suffix: string,
  returnType: T,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Query(() => [returnType], { name: `get${suffix}` })
    @UseMiddleware(...(middleware || []))
    async find(@Arg("id", { nullable: true }) id: string) {
      return id ? entity.find({ where: { id } }) : entity.find();
    }
  }
  return BaseResolver;
}

// Update an Entity BaseResolver --> (reusable)
export function UpdateResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => returnType, { name: `update${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("input", () => inputType) data: any) {
      return entity.save({ ...data, id: data.id });
    }
  }
  return BaseResolver;
}

export function DeleteResolver(
  suffix: string,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  class BaseResolver {
    @Mutation(() => Boolean, { name: `delete${suffix}` })
    @UseMiddleware(...(middleware || []))
    async delete(@Arg("id") id: string) {
      const deleted = await entity.delete(id);
      return deleted.affected > 0 ? true : false;
    }
  }
  return BaseResolver;
}
