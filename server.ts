import app from "./src/app.ts";

import { config } from "./src/config/config.ts";
import connectDB from "./src/config/db.ts";

const startServer = (): void => {
  const port = config.port;
  connectDB()
    .then(() => {
      app.listen(port, () => {
        console.log(
          `Server is listening on port:- *** http://localhost:${port}/  ***`
        );
      });
    })
    .catch((err) => console.log(`Error while connecting the Database::${err}`));
};
startServer();
