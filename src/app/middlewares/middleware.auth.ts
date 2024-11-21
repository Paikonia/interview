import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse, HttpStatusCode } from 'axios';

import BaseMiddleware from '@src/core/base/middleware';
import Util from '@src/core/utils';

class AuthMiddleware extends BaseMiddleware {
  protected async middleware(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const token = await Util.Token.extract(req);

    if (!token) {
      return this.responseHandler(
        res,
        this.UNAUTHORIZED_CODE,
        this.UNAUTHORIZED_MSG
      );
    }

    let user: any;

    try {
      const response: AxiosResponse<any, any> = await axios.get(
        'http://user-service:4041/verify-token',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === HttpStatusCode.Ok) {
        user = response.data.data.data;
      }
    } catch (error) {
      return this.responseHandler(
        res,
        this.UNAUTHORIZED_CODE,
        this.UNAUTHORIZED_MSG
      );
    }

    if (!user) {
      return this.responseHandler(
        res,
        this.UNAUTHORIZED_CODE,
        this.UNAUTHORIZED_MSG
      );
    }

    req.currentUser = user;

    return next();
  }
}

export default AuthMiddleware;
