import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') })

import { Development, development } from './development';
// crear de producción

// import { env } from 'process';

// agregar de tipo producción
let currentEnv: Development = development;

// if (env.NODE_ENV == 'production') currentEnv = production

export default currentEnv;