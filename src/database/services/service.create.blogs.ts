import Blog from "../models/Blog";
import BaseService from "../system/base";

export default class CreateBlogService extends BaseService {
  protected async transaction(data?: any): Promise<void | any> {
    const result = await Blog.create(data);
    return result;
  }
}
