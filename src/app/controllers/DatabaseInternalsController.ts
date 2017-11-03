import { Route, GET, POST } from "../../routing";
import { Context } from "koa";
import database from "../../database";

@Route("/database-internals")
export default class DatabaseInternalsController {
  @GET()
  @POST()
  public async index(ctx: Context) {
    try {
      const connection = await database.connect();
      connection.done();
      ctx.body = "Connection OK";
    } catch (err) {
      ctx.body = "Connection FAILED!";
      console.error("Connection failed:", err);
    }
  }
}
