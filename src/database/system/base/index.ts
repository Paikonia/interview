import { Op, Sequelize, QueryTypes } from 'sequelize';
import Util from '@src/core/utils';
import { IPage, IPagination } from '@src/types/db';

const { Password } = Util;

abstract class BaseService {

  protected op: typeof Op;
  protected sequelize: typeof Sequelize;
  protected queryTypes: typeof QueryTypes;
  protected PAGE_SIZE = 10;
  protected Password = Password;

  constructor() {
    this.op = Op;
    this.sequelize = Sequelize;
    this.queryTypes = QueryTypes;
  }

  protected abstract transaction(data?: any): Promise<void | any>;

  public async call<T>(data?: any): Promise<void | any> {
    try {
      return await this.transaction(data);
    } catch (err: unknown) {
      console.log({ err });
      return null;
    }
  }

  protected cursor(data: IPage): IPagination {
    const limit: number = data.pageSize || 1;
    const offset: number = (data.page - 1) * data.pageSize || 0;
    return { offset, limit };
  }
}

export default BaseService;
