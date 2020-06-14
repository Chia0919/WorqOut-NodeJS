import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createSchema } from "./utils/Schema";
import Express from "express";
import { verify } from "jsonwebtoken";
import { createConnection } from "typeorm";
import { WorkoutPlanLoader, SetLoader } from "./modules/workoutPlan/DataLoader";
if (process.env.NODE_ENV === "staging") {
  require("custom-env").env("staging");
} else if (process.env.NODE_ENV === "prod") {
  require("custom-env").env("prod");
} else {
  require("custom-env").env("dev");
}

// Entry  Point
const server = async () => {
  const {
    APP_ENV,
    APP_Name,
    ENDPOINT,
    ENDPOINT_PORT,
    ENDPOINT_PATH,
    ENDPOINT_CORS,
  } = process.env;
  console.log(APP_ENV, APP_Name, ENDPOINT_PORT, "test");
  //Establish psql conn
  await createConnection();

  ////####    Middleware Section    ####/////

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }: any) => ({
      req,
      res,
      workoutPlanLoader: WorkoutPlanLoader(),
      setLoader: SetLoader(),
    }),
  });

  const app = Express();
  app.use(
    cors({
      origin: ENDPOINT_CORS,
      credentials: true,
    })
  );

  app.use(cookieParser());

  apolloServer.applyMiddleware({ app, cors: false, path: ENDPOINT_PATH });

  app.listen(ENDPOINT_PORT, () => {
    console.log(
      `Server started at  ${ENDPOINT}:${ENDPOINT_PORT}${ENDPOINT_PATH}`
    );
  });
};

server().catch((err) => console.trace(err));
