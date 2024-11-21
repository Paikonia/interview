import { Dialect } from 'sequelize';

export interface IDBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
  [key: string]: any;
}

export interface IPagination {
  offset: number;
  limit: number;
}

export interface IPage {
  page: number;
  pageSize: number;
}

export type TUserRole =
  | 'admin'
  | 'supplier'
  | 'buyer'
  | 'localMarketing'
  | 'localLogistic'
  | 'internationalSupplier';
