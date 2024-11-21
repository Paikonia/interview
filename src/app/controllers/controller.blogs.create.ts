import BaseController from "@src/core/base/controller";
import { Request, Response } from "express";

export default class CreateBlogController extends BaseController {
  protected async module(req: Request, res: Response): Promise<void | any> {
    try {
      const result = await this.Service.CreateBlog.call(req.body);

      this.responseHandler(res, this.CREATED_CODE, this.CREATED_MSG, result);
    } catch (error: any) {
      this.responseHandler(res, this.BAD_REQUEST_CODE, this.BAD_REQUEST_MSG);
    }
  }
}
