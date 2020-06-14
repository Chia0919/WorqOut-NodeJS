import { Resolver } from "type-graphql";
import CreateResolver, {
  DeleteResolver,
  ReadResolver,
  UpdateResolver,
} from "../base/BaseResolver";
import { BodyWeightEntity, BodyWeightInput } from "./BodyWeightEntity";

CreateResolver(
  "BodyWeight",
  BodyWeightEntity,
  BodyWeightInput,
  BodyWeightEntity
);
ReadResolver("BodyWeight", BodyWeightEntity, BodyWeightEntity);
UpdateResolver(
  "BodyWeight",
  BodyWeightEntity,
  BodyWeightInput,
  BodyWeightEntity
);
DeleteResolver("BodyWeight", BodyWeightEntity);

@Resolver(() => BodyWeightEntity)
class BodyWeightResolver {}

//
