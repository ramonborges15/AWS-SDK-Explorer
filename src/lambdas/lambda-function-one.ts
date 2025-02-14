import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
    region: "sa-east-1",
    endpoint: "https://localhost.localstack.cloud:4566", // Endereço do LocalStack no host http://host.docker.internal:4566
    credentials: {
        accessKeyId: "test",
        secretAccessKey: "test",
    }
})

export default async function lambdaFunctionOne() {
    await sendNotificationEmailToUser();
    await saveFileMetadados();
}

export async function sendNotificationEmailToUser(): Promise<void> {

    const params = {
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

export async function saveFileMetadados(): Promise<void> { }

export function sendMessageToQueue(): void { }
