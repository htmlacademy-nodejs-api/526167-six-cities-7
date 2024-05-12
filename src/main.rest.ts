import { PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { RestApplicationConfig } from './shared/libs/config/rest.config.js';

async function init() {
  const logger = new PinoLogger();
  const config = new RestApplicationConfig(logger);
  const restApp = new RestApplication(logger, config);
  await restApp.init();
}

init();

