import { Model, Optional } from "sequelize";

export interface BlogAttributes {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCreateAttributes
  extends Optional<BlogAttributes, "id" | "updatedAt" | "createdAt"> {}

export default class Blog
  extends Model<BlogAttributes, BlogCreateAttributes>
  implements BlogAttributes
{
  declare id: string;
  declare title: string;
  declare body: string;
  declare createdAt: string;
  declare updatedAt: string;
}
