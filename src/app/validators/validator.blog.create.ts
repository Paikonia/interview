import { Request, Response, NextFunction } from "express";

import BaseMiddleware from "@src/core/base/middleware";

export default class CreateBlogValidator extends BaseMiddleware {
  protected middleware(req: Request, res: Response, next: NextFunction): void {
    //Complete this please
    const schema = this.joi.object().keys({});

    this.bodyHandler(req, res, schema, next);
  }
}
