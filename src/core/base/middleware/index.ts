import { Request, Response, NextFunction } from 'express';
import joi, { Schema } from 'joi';
import Base from '@src/core/base/Base';
import IJoiError from '@src/types/validator';

abstract class BaseMiddleware extends Base implements IJoiError {
  protected joi = joi;

  private options: any = { language: { key: '{{key}}' } };

  protected bodyHandler(
    req: Request,
    res: Response,
    schema: Schema,
    next: NextFunction
  ): Response | void {
    const { error } = schema.validate(req.body, this.options);

    if (error) {
      return this.joi_error(res, error);
    }
    return next();
  }

  protected queryHandler(
    req: Request,
    res: Response,
    schema: Schema,
    next: NextFunction
  ): Response | void {
    const { error } = schema.validate(req.query, this.options);

    if (error) {
      return this.joi_error(res, error);
    }
    return next();
  }

  protected paramsHandler(
    req: Request,
    res: Response,
    schema: Schema,
    next: NextFunction
  ): Response | void {
    const { error } = schema.validate(req.params, this.options);

    if (error) {
      return this.joi_error(res, error);
    }
    return next();
  }

  joi_error(res: Response, error: any): Response {
    return this.error(
      res,
      this.BAD_REQUEST_CODE,
      error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '')
    );
  }

  protected abstract middleware(
    req: Request,
    res: Response,
    next: NextFunction
  ): void;

  public async run(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | any> {
    try {
      return await this.middleware(req, res, next);
    } catch (error: unknown) {
      // console.log(error);
      return null;
    }
  }
}

export default BaseMiddleware;
