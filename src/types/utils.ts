import { Request, Response } from 'express';
export interface IPassword {
  salt(): string;
  hash(password: string, salt: string): string;
  compare(password: string, hashedPassword: string, salt: string): boolean;
}

export interface IToken {
  generate(payload: any, expiresIn: any): string | null;
  decode(token: string): any;
  extract(req: Request, res: Response): string;
}
