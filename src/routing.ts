import { Middleware, Context } from "koa";
import * as Router from "koa-router";

export const enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS"
}

/**
 * Represents a route to a given controller method
 */
interface IRoute {
  method: HttpMethod;
  prefix: string;
  handler: Middleware;
}

const MetadataKeys = {
  Prefix: Symbol("prefix"),
  Routes: Symbol("routes")
};

interface IConstructor {
  new (): {};
}

// tslint:disable-next-line:ban-types
const routesFor = (constructor: IConstructor) =>
  (Reflect.getOwnMetadata(MetadataKeys.Routes, constructor) || []) as IRoute[];

const prefixFor = (constructor: IConstructor) =>
  Reflect.getOwnMetadata(MetadataKeys.Prefix, constructor) as string | undefined;

function bindHandler(constructor: IConstructor, handler: Middleware): Middleware {
  return ctx => {
    // Create a new controller instance for each request
    const instance = new constructor();
    handler.call(instance, ctx);
  };
}

export function asMiddleware(constructor: IConstructor): Middleware {
  const router = new Router();
  const prefix = prefixFor(constructor);
  if (prefix) {
    router.prefix(prefix);
  }
  const routes = routesFor(constructor);
  for (const route of routes) {
    router.register(route.prefix, [route.method], bindHandler(constructor, route.handler));
  }
  return router.routes();
}

export function routeHandler(method: HttpMethod, prefix = "/") {
  return (prototype: object, methodName: string, descriptor: TypedPropertyDescriptor<Middleware>) => {
    const handler = descriptor.value!;
    // Attach routes metadata to constructor, not prototype
    const route: IRoute = {
      handler,
      method,
      prefix
    };
    Reflect.defineMetadata(
      MetadataKeys.Routes,
      [...routesFor(prototype.constructor as IConstructor), route],
      prototype.constructor
    );
    console.log("Registered route %s %s -> %s.%s", method, prefix, prototype.constructor.name, methodName);
  };
}

export function Route(prefix: string) {
  return (constructor: IConstructor) => {
    Reflect.defineMetadata(MetadataKeys.Prefix, prefix, constructor);
  };
}

const makeRouteHandler = (method: HttpMethod) => (prefix?: string) => routeHandler(method, prefix);
export const GET = makeRouteHandler(HttpMethod.GET);
export const POST = makeRouteHandler(HttpMethod.POST);
export const PATCH = makeRouteHandler(HttpMethod.PATCH);
