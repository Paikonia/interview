import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import Base from '@src/core/base/Base';
import Util from '@src/core/utils';
import { IRoute } from '@src/types/App';
import { httpLogStream } from '@src/core/utils/logger';

class App extends Base {
  public app: any;

  constructor(routes: IRoute[]) {
    super();
    this.app = express();
    this.initMiddlewares();
    this.initRoutes(routes);
    
    this.initDefaultRoutes();
  }

  private initMiddlewares(): void {
    const allowedOrigins = [
      "http://localhost",
      "http://localhost:5173",
      "https://www.omniglobex.com",
      "http://localhost:5172",
      "http://localhost:5174",
    ];

    const corsOptions = {
      origin: function (origin: string | undefined, callback: Function) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };
    this.app.use(cors(corsOptions));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(morgan('combined', { stream: httpLogStream }));
  }

  private initRoutes(routes: IRoute[]): void {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initDefaultRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      return this.responseHandler(res, this.SUCCESS_CODE, this.WLECOME_MSG);
    });

    this.app.all('/', (req: Request, res: Response) => {
      return this.responseHandler(
        res,
        this.BAD_REQUEST_CODE,
        this.INVALID_METOD
      );
    });

    this.app.use('*', (req: Request, res: Response) => {
      Util.logger.error(this.INVALID_ROUTE);
      return this.responseHandler(res, this.NOT_FOUND_CODE, this.INVALID_ROUTE);
    });
  }

  listen(): void {
    this.app.listen(Util.port, () => {
      Util.logger.info(this.listening(Util.port));
    });
  }

  getApp = () => this.app;
}

export default App;
