import lambdaFunctionOne from "./src/lambdas/lambda-function-one"

export async function handler(event: any) {
    console.log("Iniciando a execução da Lambda");

    return lambdaFunctionOne()
        .then(() => {
            console.log("Lambda concluída com sucesso!");
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Email enviado com sucesso!" }),
            };
        })
        .catch((error) => {
            console.error("Erro na Lambda:", error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: "Falha ao enviar email", error: error.message }),
            };
        });

}