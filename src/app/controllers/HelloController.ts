import { GET } from "../../routing";
import { Context } from "koa";

export default class HelloController {
  @GET()
  public async index(ctx: Context) {
    ctx.body = "Hello world!";
  }
}
