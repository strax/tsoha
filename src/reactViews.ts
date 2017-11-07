import { Middleware, Context } from "koa";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

const DOCTYPE = "<!DOCTYPE html>";

export default async function reactViews(ctx: Context, next: () => any) {
  const response = await next();
  if (React.isValidElement(response)) {
    ctx.type = "text/html;charset=utf-8";
    ctx.body = DOCTYPE.concat(ReactDOMServer.renderToString(response));
  }
}
