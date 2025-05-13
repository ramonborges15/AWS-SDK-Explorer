import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { PutCommand, PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "../models/dynamodb-cliente";

const sesClient = new SESClient({
    region: "sa-east-1",
    endpoint: "https://localhost.localstack.cloud:4566", // Endereço do LocalStack no host http://host.docker.internal:4566
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
    }
})

export default async function lambdaFunctionOne(event: any) {

    // TO DO: Como enviar algumas informações do arquivo para a função lambda? Precisamos chegar aqui com algo.
    await sendNotificationEmailToUser();
    await saveFileMetadados(event);
}

export async function sendNotificationEmailToUser(paramBody: any = null): Promise<void> {

    let params = paramBody;

    if (!paramBody) {
        params = {
            Source: 'ramonbsales@gmail.com',
            Destination: {
                ToAddresses: ['ramontricolor12@gmail.com'],
            },
            Message: {
                Subject: {
                    Data: 'Envio de e-mail com localstack'
                },
                Body: {
                    Text: {
                        Data: 'Teste de envio de email utilizando o SES com localstack'
                    }
                }
            }
        };
    }

    try {

        console.log("Criar command.")
        const command = new SendEmailCommand(params);
        console.log("Enviando email...")
        const response = await sesClient.send(command);
        console.log("Email enviado! MessageId: ", response.MessageId);
    } catch (error) {
        console.error("Erro ao enviar email:", error);
        throw error; // Propaga o erro para o handler
    }
}

function generateUniqueHashCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

export async function saveFileMetadados(event: any): Promise<PutCommandOutput> {

    console.log("[DynamoDB] Salvando metadados do arquivo.");
    // console.log("Evento S3 recebido:", JSON.stringify(event, null, 2));

    const s3Record = event.Records[0].s3;
    const bucketName = s3Record.bucket.name;
    const fileName = s3Record.object.key;
    const fileSize = s3Record.object.size;

    const item = {
        "IDdoArquivo": fileName + generateUniqueHashCode(),
        "DataDoUpload": new Date().toISOString(),
        "nomeBucket": bucketName,
        "NomeDoArquivo": fileName,
        "caminhoArquivoS3": "bucket-backup/documentos/documento_importante.docx",
        "tamanhoArquivo": fileSize,
        "tipoArquivo": fileName.split('.').pop()
    }

    try {
        console.log("[DynamoDB] Criando item:", JSON.stringify(item, null, 2));

        const command = new PutCommand({
            TableName: "MetadadosBackup",
            Item: item
        });

        console.log("[DynamoDB] PutItem payload:", JSON.stringify({
            TableName: "MetadadosBackup",
            Item: item
        }, null, 2));

        const response = await ddbDocClient.send(command);
        console.log("[DynamoDB] Item inserido:", response);
        return response;
    } catch (error) {
        const params = {
            Source: 'ramonbsales@gmail.com',
            Destination: {
                ToAddresses: ['ramontricolor12@gmail.com'],
            },
            Message: {
                Subject: {
                    Data: 'Erro ao salvar metadados do arquivo no DynamoDB'
                },
                Body: {
                    Text: {
                        Data: `${error}`
                    }
                }
            }
        };

        await sendNotificationEmailToUser(params);

        console.error("[DynamoDB] Erro ao inserir item:", error);
        throw error;
    }
}

export function sendMessageToQueue(): void { }
