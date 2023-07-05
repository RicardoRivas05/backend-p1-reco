import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';



const config = {
  name: 'conn',
  connector: 'mongodb',
  url: 'mongodb+srv://root:pKd9kOtpAY4VnWQ2@cluster0.btzrk0a.mongodb.net/RecoDB',
  host: 'cluster0.btzrk0a.mongodb.net',
  port: 27017,
  user: 'root',
  password: 'pKd9kOtpAY4VnWQ2',
  database: 'RecoDB',
  useNewUrlParser: true
};



// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ConnDataSource extends juggler.DataSource
implements LifeCycleObserver {
  static dataSourceName = 'conn';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.conn', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

// STAGE=dev

// DB_URL=mongodb://noRoot:control1*@localhost:27017/RecoDB?authMechanism=DEFAULT
// DB_HOST=localhost:27017
// DB_PROTOCOL=mongodb
// MONGO_INITDB_ROOT_USERNAME=admin
// MONGO_INITD B_ROOT_PASSWORD=control1*
// DB_NAME=RecoDB
// DB_PORT=27017

// PORT=3001
// HOST=0.0.0.0


// const config = {
//   name: 'conn',
//   connector: 'mongodb',
//   url: 'mongodb://noRoot:control1*@localhost:27017/RecoDB?authMechanism=DEFAULT',
//   useNewUrlParser: true,
// };
