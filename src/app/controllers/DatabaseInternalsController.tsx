import { Route, GET, POST } from "../../routing";
import { Context } from "koa";
import database from "../../database";
import * as views from "../views/databaseInternals";
import * as React from "react";

@Route("/database-internals")
export default class DatabaseInternalsController {
  @GET()
  @POST()
  public async index(ctx: Context) {
    const tables = await database.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema='public';"
    );
    console.log(tables);
    return <views.Show tables={tables} />;
  }
}
