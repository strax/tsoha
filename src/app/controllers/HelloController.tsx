import { GET } from "../../routing";
import { Context } from "koa";
import * as views from "../views/hello";
import * as React from "react";

export default class HelloController {
  @GET()
  public async index(ctx: Context) {
    return <views.index />;
  }
}
