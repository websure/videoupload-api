/* 
  create Express server and initialize middleware and listen to port 5000
*/
import express from "express";
import { ExpressMiddlewareConfig } from "./config/middleware";

/* Import routes */
import apiRoutes from "./modules";

/* Register for routes and initialize middleware */
const app = express();
ExpressMiddlewareConfig(app);
apiRoutes(app);

export default app;
