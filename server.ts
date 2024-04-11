import app from "./src/app.ts";

const startServer = () => {
  const port = process.env.PORT || 5173;

  app.listen(port, () => {
    console.log(
      `Server is listening on port:- *** http://localhost:${port}/  ***`
    );
  });
};
startServer();
