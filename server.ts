import app from "./src/app.ts";

import { config } from "./src/config/config.ts";
import connectDB from "./src/config/db.ts";

const startServer = (): void => {
  const port = config.port;
  connectDB();
  app.listen(port, () => {
    console.log(
      `Server is listening on port:- *** http://localhost:${port}/  ***`
    );
  });
};
startServer();
