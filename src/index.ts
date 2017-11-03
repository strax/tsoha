import "reflect-metadata";

import * as Koa from "koa";
import * as assert from "assert";
import routes from "./routes";
import { asMiddleware } from "./routing";
import DatabaseInternalsController from "./app/controllers/DatabaseInternalsController";

async function bootstrap() {
  const app = new Koa();
  const port = process.env.port || 8080;
  app.use(asMiddleware(DatabaseInternalsController));
  app.listen(port);
  console.log("Listening on port %d", port);
}

bootstrap();
