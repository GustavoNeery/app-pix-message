import fastify from "fastify";
import { transactionRoutes } from "./routes/routes";

export const app = fastify();

app.register(transactionRoutes);
