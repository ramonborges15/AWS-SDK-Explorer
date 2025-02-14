import { FastifyInstance } from "fastify";
import { S3 } from "@aws-sdk/client-s3";

export async function routes(app: FastifyInstance) {
    app.get("/", () => {
        return "Hello World!";
    });


    app.post("/upload", async (request, reply) => {
        const s3 = new S3({
            region: "sa-east-1",
            endpoint: "http://localhost:4566",
            forcePathStyle: true,
        });

        const data = await request.file();

        if (data?.file === undefined || data?.filename === undefined) {
            reply.status(400).send({ error: "Invalid request" });
            return;
        }

        const params = {
            Bucket: "uploaded-documents-202412241304-bucket",
            Key: data.filename,
            Body: data.file,
        };

        try {
            const result = await s3.putObject(params);
            reply.send({ message: "File uploaded successfully", data: result });
        } catch (err) {
            console.error("Error uploading file:", err);
            reply.status(500).send({ error: "Error uploading file" });
        }
    });
}