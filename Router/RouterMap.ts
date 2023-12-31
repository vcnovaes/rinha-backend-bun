import { MongoClient } from "mongodb";
import { UserRepository } from "../Data/UserRepository";

type Controller = (
  request: Request,
  client: UserRepository
) => Response | Promise<Response>;
export interface Route {
  method: string;
  path: string;
}

export class Router {
  private _routerMap: Map<string, Controller>;
  constructor() {
    this._routerMap = new Map<string, Controller>();
  }
  public add(route: Route, controller: Controller) {
    this._routerMap.set(this.routeKey(route), controller);
    return this;
  }

  private routeKey(route: Route) {
    return `${route.method}: ${route.path}`;
  }

  public exec(route: Route, req: Request, client: UserRepository) {
    const controller = this._routerMap.get(this.routeKey(route));
    if (!controller) return new Response("", { status: 404 });
    return controller(req, client);
  }
}
