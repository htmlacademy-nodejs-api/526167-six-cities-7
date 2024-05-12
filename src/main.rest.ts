import { PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';

async function init() {
  const logger = new PinoLogger();
  const restApp = new RestApplication(logger);
  await restApp.init();
}

init();

