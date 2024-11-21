import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { IToken } from '@src/types/utils';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

class TokenUtils implements IToken {
  protected secret_key = JWT_SECRET_KEY;

  generate(
    payload: any = {},
    expiresIn: any = { expiresIn: '1d' }
  ): string | null {
    let isValidPayload = true;
    if (typeof payload === 'number') {
      isValidPayload = false;
    } else if (payload === null) {
      isValidPayload = false;
    } else if (typeof payload === 'object' && !Object.keys(payload).length) {
      isValidPayload = false;
    }

    return isValidPayload
      ? jwt.sign({ payload }, this.secret_key as string, expiresIn)
      : null;
  }

  decode(token: string): any {
    try {
      return jwt.verify(token, this.secret_key as string);
    } catch (error: any) {
      return { errors: error };
    }
  }

  extract(req: Request): string {
    const { authorization = '' } = req.headers;

    const token: string = authorization.slice(7);
    return token;
  }
}

export default TokenUtils;
