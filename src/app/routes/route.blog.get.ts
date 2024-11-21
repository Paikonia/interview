import { IRoute } from "@src/types/App";
import { NextFunction, Request, Response, Router } from "express";
import controllers from "../controllers";

export default class GetBlogRoute implements IRoute {
  path: string;
  router: Router = Router();

  constructor(path: string) {
    this.path = path;
    this.initRoute();
  }
  private initRoute() {
    this.router
      .route(`${this.path}`)
      .get((req: Request, res: Response) =>
        controllers.GetBlog.execute(req, res)
      );
  }
}
