import { pbkdf2Sync, randomBytes } from 'crypto';
import { IPassword } from '@src/types/utils';

class PasswordUtils implements IPassword {
  /**
   * @method salt generate random salt
   * @returns {string} the random generated salt
   */
  salt(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * @method hash hash password
   * @param {string} password the password from the body
   * @param {string} salt the generated salt
   * @returns {string} the hashed password
   */
  hash(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 100000, 64, `sha512`).toString('hex');
  }

  /**
   * @method compare compare password
   * @param {string} password the password from the body
   * @param {string} hashedPassword the password in the db
   * @param {string} salt the salt from the db
   * @returns {boolean}
   */
  compare(password: string, hashedPassword: string, salt: string): boolean {
    const hash = this.hash(password, salt);
    return hash === hashedPassword;
  }
}

export default PasswordUtils;
