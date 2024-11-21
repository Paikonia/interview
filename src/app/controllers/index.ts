import CreateBlogController from "./controller.blogs.create";
import GetBlogController from "./controller.blogs.get";

const CreateBlog = new CreateBlogController();
const GetBlog = new GetBlogController();

export default { GetBlog, CreateBlog };
