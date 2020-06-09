import app from './app'
import {createConnection} from "typeorm";
import { PORT } from './config/constants';

createConnection().then(()=> {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}🚀🚀🚀🚀`);
  });
  }).catch(error=> console.log(error))