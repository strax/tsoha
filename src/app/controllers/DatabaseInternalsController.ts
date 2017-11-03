import { Route, GET } from "../../routing";
import { Context } from "koa";

@Route("/database-internals")
export default class DatabaseInternalsController {
  @GET("/")
  public async index(ctx: Context) {
    ctx.body = "Hello world!";
  }
}
