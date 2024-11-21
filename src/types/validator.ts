/* eslint-disable no-unused-vars */
import { Response } from 'express';

interface IJoiError {
  joi_error(res: Response, error: any): Response;
}

export default IJoiError;
