import path from "path";
import { buildSchema } from "type-graphql";
export const createSchema = () =>
  buildSchema({
    resolvers: [path.join(__dirname, "../modules/**/*Resolver.ts")],

    authChecker: async (
      { root, args, context, info },
      roles
    ): Promise<boolean> => {
      console.log(context.payload);
      //custom api
      // here we can read the user from context
      console.log(roles);
      return false; // or false if access is denied
    },
  });
