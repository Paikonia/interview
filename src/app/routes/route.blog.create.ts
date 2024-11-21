import { IRoute } from "@src/types/App";
import { NextFunction, Request, Response, Router } from "express";
import controllers from "../controllers";
import middlewares from "../middlewares";
import validators from "../validators";

export default class GetBlogRoute implements IRoute {
  path: string;
  router: Router = Router();

  constructor(path: string) {
    this.path = path;
    this.initRoute();
  }
  private initRoute() {
    this.router.route(`${this.path}`).get(
      (req: Request, res: Response, next: NextFunction) =>
        middlewares.Auth.run(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        validators.CreateBlog.run(req, res, next),
      (req: Request, res: Response) => controllers.GetBlog.execute(req, res)
    );
  }
}
