import CreateBlogService from "./service.create.blogs";
import GetBlogService from "./service.get.blogs";

const CreateBlog = new CreateBlogService();
const GetBlog = new GetBlogService();

export default {
  CreateBlog,
  GetBlog,
};
