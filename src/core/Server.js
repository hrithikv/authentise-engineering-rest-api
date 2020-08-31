import config from "../config";
import App from "./App";

export default class Server {
  constructor() {
    this.server = "";
  }

  async start() {
    if (this.server) return Promise.resolve(Server.createStatusMsg());

    this.server = await new App().start();

    this.server.set("trust proxy", "loopback");

    return new Promise(resolve => {
      const { httpPort, httpHost } = config;
      const resolver = () => resolve(Server.createStatusMsg());
      this.server.listen(httpPort, httpHost, resolver);
    });
  }

  static createStatusMsg() {
    const { appName, httpPort } = config;
    return `${appName} is listening on port ${httpPort}`;
  }

  static getInstance() {
    return this.server;
  }

  static stop() {
    process.exit(0);
  }
}
