## Motivation and features
The primary goal of this repository is to gain hands-on experience with the following AWS services:
 - **S3 (Simple Storage Service):** For storing original documents and their backups in a secure and scalable manner.
 - **Lambda:** For automating the backup process through event-triggered functions, reacting to changes in the S3 bucket.
 - **SES (Simple Email Service):** For sending email notifications to users upon successful backup completion or potential errors.
 - **CloudWatch:** For monitoring the overall system, through logs, ensuring that the backup process is running smoothly and efficiently.
 - **DynamoDB:** For storing file metadata (name, backup date, etc.) for efficient organization and retrieval.
 - **SNS (Simple Notification Service):** For real-time notifications about backup progress, enabling multiple devices or users to stay informed.