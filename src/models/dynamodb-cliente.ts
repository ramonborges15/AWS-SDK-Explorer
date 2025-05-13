import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({
    region: 'sa-east-1',
    endpoint: "https://localhost.localstack.cloud:4566", // Endpoint do LocalStack
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
    }
});

// Cliente DocumentDB para operações simplificadas
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDBClient);

export { ddbDocClient };