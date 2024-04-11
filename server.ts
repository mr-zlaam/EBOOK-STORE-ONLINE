import app from "./src/app.ts";

import { config } from "./src/config/config.ts";

const startServer = () => {
  const port = config.port;

  app.listen(port, () => {
    console.log(
      `Server is listening on port:- *** http://localhost:${port}/  ***`
    );
  });
};
startServer();
