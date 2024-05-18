import 'reflect-metadata';
import { Container } from 'inversify';

import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { RestApplication } from './rest/index.js';
import { Config, RestSchema, RestApplicationConfig } from './shared/libs/config/index.js';
import { Component } from './shared/types/index.js';

async function init() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestApplicationConfig).inSingletonScope();

  const app = container.get<RestApplication>(Component.RestApplication);
  await app.init();
}

init();

