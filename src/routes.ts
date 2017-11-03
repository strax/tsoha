import * as compose from "koa-compose";
import * as controllers from "./app/controllers";
import { asMiddleware } from "./routing";
import { Middleware } from "koa";

export default function routes(): Middleware {
  return compose(Object.values(controllers).map(asMiddleware));
}
