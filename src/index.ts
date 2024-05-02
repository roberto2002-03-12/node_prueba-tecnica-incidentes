import Server from "./api/server";
import config from './config/index';
import { DataBase } from './database';
import moment from 'moment';

export const server = Server.init(Number(config.PORT));

server.start(() => {
  console.log('Server is running on PORT: ' + config.PORT);
  DataBase.instance
  console.log('MOMENT UTC Lima :: ', moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
});