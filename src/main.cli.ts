#!/usr/bin/env node
import { ImportCommand } from './cli/commands/import.command.js';
import { CLIApplication, HelpCommand, VersionCommand } from './cli/index.js';

const init = () => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommand([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApplication.processCommand(process.argv.slice(2));
};

init();
