import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import { routes } from "./routes";
import multipart from "@fastify/multipart";

const app = fastify({
    logger: true,
});

app.register(fastifyCors, { origin: "*" });
app.register(multipart);
app.register(routes);

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP Server is running on port 3333");
});