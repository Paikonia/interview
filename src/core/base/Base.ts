import { Response } from 'express';

import Service from '@src/database/services';
import logger from '../utils/logger';

class Base {
  
  protected Logger = logger;

  protected Service = Service;

  protected INTERNAL_SERVER_ERROR_CODE = 500;

  protected NOT_FOUND_CODE = 404;

  protected SUCCESS_CODE = 200;

  protected CREATED_CODE = 201;

  protected BAD_REQUEST_CODE = 400;

  protected METHOD_NOT_ALLOWED_CODE = 405;

  protected PAYMENT_REQUIRED_CODE = 402;

  protected FORBIDDEN_CODE = 403;

  protected UNAUTHORIZED_CODE = 401;

  protected CONFLIT_CODE = 409;

  protected WLECOME_MSG = 'Welcome to the API';

  protected INVALID_METOD = 'Invalid method';

  protected INVALID_ROUTE = 'Invalid route';

  protected listening(port: number | boolean): string {
    return `app listening on port ${port}`;
  }

  protected INTERNAL_SERVER_ERROR_MSG = 'internal server error ';

  protected EMAIL_VERIFICATION_LIMIT_REACHED =
    'we are unable to verify your email at this time. Please Try again later';
  protected EMAIL_ALREADY_VERIFIED_MSG =
    'This email address has been verified already. Try to login instead';
  protected NOT_FOUND_MSG = 'resource not found';
  protected ALREADY_EXIT_MSG = 'already exists';
  protected USERNAME_ALREADY_EXIT_MSG = 'username already exists';
  protected EMAIL_ALREADY_EXIT_MSG = 'email already exists';

  protected REVERIFICATION_EMAIL =
    'please check your email to complete the re-verification process';

  protected UPLOAD_DOCUMENT_EMAIL_MSG =
    'please check your email to re-verify again so you upload your documents';

  protected VERIFICATION_EMAIL_MSG =
    'please check your email to complete the verification process';

  protected RESET_PASSWORD_MSG =
    'please check your email to reset your password';

  protected SUCCESS_MSG = 'request was successfull';

  protected JOB_ALREADY_FAVORITE_MSG = 'this job is already favorite';

  protected JOB_NOT_PART_OF_YOUR_FAVORITE_YET_MSG =
    'this is not yet part of your favorite';

  protected CREATED_MSG = 'created successfully ';

  protected BAD_REQUEST_MSG = 'request was invalid';

  protected USER_NOT_FOUND = 'user not found';

  protected USER_ACCOUNT_BLOCKED = 'this account is blocked';

  protected COMPANY_ACCOUNT_REJECTED =
    'this account documents have been rejected';

  protected METHOD_NOT_ALLOWED_MSG = 'wrong method implementation';

  protected PAYMENT_REQUIRED_MSG = 'payment required';

  protected FORBIDDEN_MSG = 'forbidden request';

  protected UNAUTHORIZED_MSG = 'Unauthorized';

  protected AUTH_FAILURE_MSG = 'Invalid Credentials';

  protected AUTH_BANNED_MSG = 'This account has been banned by the admin';

  protected NO_ENTRY_MSG = 'Entry do not exist';

  protected INVALID_COUPON_CODE = 'Invalid Coupon Code';

  protected INVALID_TOKEN_MSG = 'Token is not valid';

  protected TOKEN_EXPIRED_MSG = 'Token is expired';

  protected NO_DATA_MSG = 'no data available';

  protected MISSING_TOKEN_MSG = 'access token was not provided';

  protected COMPANY_VERIFIED_ERROR_MSG =
    'your documents are still under review';

  protected COMPANY_NO_DOCUMENTS_FOUND_ERROR_MSG =
    'cannot validate a company without documents of registration';

  protected JOB_POSITION_LIMIT_MSG =
    'you have reached the limit of creating job positions';

  protected ACTIVE_JOB_POSITION_LIMIT_MSG =
    'you have reached the limit of active job positions';

  protected ACTIVE_JOB_POSITION_CONDITION_MSG =
    'you need a valid subscription to update any job position status';

  protected SUBSCRIBE_ERROR_MSG =
    'subscribe now to be able to create a job position';

  protected JOB_OFFER_SUBSCRIPTION_REQUIRED =
    'you need a valid subscription to accept this job offer';

  protected JOB_NOT_EXISTS = 'job not exist';

  protected JOB_REJECTED_ALREADY_MSG = 'this job has been rejected already';

  protected JOB_ACCEPTED_ALREADY_MSG = 'this job has been accepted already';

  protected JOB_OFFER_SENT_ALREADY_MSG = 'a job offer has been sent already';

  protected JOB_BLOCKED_ALREADY_MSG = 'this job has been blocked already';

  protected JOB_OFFER_NOT_EXISTS = 'job offer not exist';

  protected JOB_POSITION_NOT_EXISTS = 'job position not exists';

  protected JOB_POSITION_DOES_NOT_MATCH_WITH_JOB =
    'this job does not match with any of your active job positions. Create a job position that matches this job title.';

  protected JOB_POSITION_VIDEO_REQUIRED =
    'this job position does not have a video. A video is required in order to apply to a job.';

  protected JOB_OFFER_ALREADY_ACCEPTED_MSG =
    'this job offer has been accepted already';

  protected JOB_OFFER_CREATE_ERROR_MSG =
    'the job offer was not created. Please, try again later';

  protected JOB_OFFER_ALREADY_REJECTED_MSG =
    'this job offer has been rejected already';

  protected JOB_OFFER_ALREADY_EXPIRED_MSG =
    'this job offer has already expired';

  protected JOB_ALREADY_EXPIRED_MSG = 'this job has expired already';

  protected JOB_POSITION_PROMOTION_EXPIRED_MSG =
    'this promotion has expired already. Start a new promotion';

  protected JOB_PROMOTION_EXPIRED_MSG =
    'this promotion has expired already. Start a new promotion';

  protected JOB_POSITION_PROMOTION_INVALID_MSG =
    'this promotion is invalid and the status cannot be changed';

  protected JOB_POSITION_ACTIVATION_REQUEST_MSG =
    'you need to activate first the associated job position before running this promotion again';

  protected JOB_ACTIVATION_REQUEST_MSG =
    'you need to activate first the associated job before running this promotion again';

  protected JOB_OFFER_ALREADY_SENT_TO_THIS_CANDIDATE = `you have already send a job offer to this candidate's job position`;

  protected ALREADY_PROMOTE_JOB_PODITION =
    'already promote this job position, please go and update it';

  protected ALREADY_APPLIED =
    'you have already applied to this job. You cannot apply to this job anymore.';

  protected CANDIDATE_SUBSCRIPTION_ERROR_MSG =
    'your account has no active subscription. Subscribe now to be able to apply to jobs';

  protected UPDATE_JOB_POSITION_WORLDWIDE_COUNTRY_MSD =
    'worldwide should be active or add at least one country in the list';

  protected UPDATE_JOB_POSITION_WORLDWIDE_MSD =
    'worldwide is active. No country is required in the list';

  protected INSUFICIENT__REFERRAL_POINTS_CONVERSION_MSG =
    'You do not have enough point to convert to a subscription';

  protected INSUFICIENT__REFERRAL_POINTS_CV_PROMOTION_MSG =
    'You do not have enough point to promote your job position';

  protected INSUFICIENT__REFERRAL_POINTS_JOB_OFFER_MSG =
    'You do not have enough point to accept this job offer';

  protected JOB_POSITION_DELETION_PROHIBITED_MSG =
    'You cannot delete anymore a job position with an accepted job offer';

  protected success(
    res: Response,
    code: number,
    message: string,
    data: unknown
  ): Response {
    return res.status(code).json({
      status: code,
      message,
      data,
    });
  }

  protected error(res: Response, code: number, message: string): Response {
    return res.status(code).json({
      status: code,
      message,
    });
  }

  protected ok(res: Response): Response {
    return res.status(this.SUCCESS_CODE).json({
      status: this.SUCCESS_CODE,
      message: this.SUCCESS_MSG,
    });
  }

  protected serverError(res: Response): Response {
    return this.error(
      res,
      this.INTERNAL_SERVER_ERROR_CODE,
      this.INTERNAL_SERVER_ERROR_MSG
    );
  }


  protected responseHandler(
    res: Response,
    httpCode: number,
    message: string,
    data?: any
  ): Response {
    return res.status(httpCode).json({
      status: httpCode,
      message,
      data,
    });
  }
}

export default Base;
