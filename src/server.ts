import fastify from "fastify";

const app = fastify();

app.get('/', (request, reply) => {
  reply.send({ message: 'First route pix message!'});
})


app.listen({port: 3000, host: '0.0.0.0'}, (err, address) => {
  if (err) {
    console.error("Error starting server: ", err);
    process.exit(1);
  }
  console.log('Http Server is running at ', address);
})