import "reflect-metadata";

import * as Koa from "koa";
import * as assert from "assert";
import routes from "./routes";
import reactViews from "./reactViews";

async function bootstrap() {
  const app = new Koa();
  const port = process.env.PORT || 8080;
  app.use(reactViews);
  app.use(routes());
  app.listen(port);
  console.log("Listening on port %d", port);
}

bootstrap();
