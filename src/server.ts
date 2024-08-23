import fastify from "fastify";
import { createTransaction } from "./routes/transaction.routes";

const app = fastify();

app.register(createTransaction);

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error("Error starting server: ", err);
    process.exit(1);
  }
  console.log("Http Server is running at ", address);
});
