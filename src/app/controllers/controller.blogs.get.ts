import BaseController from "@src/core/base/controller";
import { Request, Response } from "express";

export default class GetBlogController extends BaseController {
  protected async module(req: Request, res: Response): Promise<void | any> {
    try {
      const result = await this.Service.GetBlog.call();

      this.responseHandler(res, this.SUCCESS_CODE, this.SUCCESS_MSG, result);
    } catch (error: any) {
      this.responseHandler(res, this.BAD_REQUEST_CODE, this.BAD_REQUEST_MSG);
    }
  }
}
