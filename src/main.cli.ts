import { CLIApplication, HelpCommand, VersionCommand } from './cli/index.js';

const init = () => {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommand([
    new HelpCommand(),
    new VersionCommand(),
  ]);

  cliApplication.processCommand(process.argv.slice(2));
};

init();
