# AWS-SDK-Explorer
This repository is a personal project designed to explore and study the main tools of the AWS SDK (Software Development Kit). It implements a basic yet functional document backup and notification system using a variety of AWS services, providing a practical learning environment for interacting with the AWS cloud.


## Motivation
The primary goal of this repository is to gain hands-on experience with the following AWS services:
 - **S3 (Simple Storage Service):** For storing original documents and their backups in a secure and scalable manner.
 - **EC2 (Elastic Compute Cloud) / EBS (Elastic Block Storage):** For creating an EC2 instance with an EBS volume to store redundant backups.
 - **Lambda:** For automating the backup process through event-triggered functions, reacting to changes in the S3 bucket.
 - **SES (Simple Email Service):** For sending email notifications to users upon successful backup completion or potential errors.
 - **CloudWatch:** For monitoring the overall system health, tracking storage usage, backup frequency, and potential issues.
 - **DynamoDB:** For storing file metadata (name, backup date, etc.) for efficient organization and retrieval.
 - **SNS (Simple Notification Service):** For real-time notifications about backup progress, enabling multiple devices or users to stay informed.
 - **SQS (Simple Queue Service):** For managing additional background tasks like backup integrity checks or file compression.

## Project Features
 - **Secure Document Upload:** Upload important documents to a designated S3 bucket with encryption enabled for data protection.
 - **Automated Backups:** Lambda functions triggered by S3 events automatically create backups of uploaded documents to the EBS volume attached to an EC2 instance.
 - **Email Notifications:** Receive timely email notifications via SES about the status of each backup process, ensuring you're informed of successes or failures.
 - **System Monitoring:** Leverage CloudWatch to monitor the system's performance, including available EBS storage, backup frequency, and any potential errors encountered.
 - **Metadata Management:** Utilize DynamoDB to store and manage file metadata, allowing for easy organization and retrieval of backed-up documents.
 - **Real-time Notifications:** Utilize SNS for real-time notifications about backup progress, enabling other devices or users to stay updated on the process.
 - **Background Task Management:** Employ SQS to manage a queue for additional tasks like verifying backup integrity or compressing files for storage efficiency.

## Future Enhancements
The project can be further expanded with additional features, including:
 - **Secure File Sharing:** Implement mechanisms for sharing backed-up files securely with other users.
 - **Version Control:** Enable recovery of previous versions of documents.
 - **Document Categorization:** Categorize and enable keyword-based searching for documents.
 - **Integration with Productivity Tools:** Integrate the system with existing productivity tools for a streamlined workflow.

This project serves as a foundation for a robust and practical understanding of the AWS SDK and its diverse set of tools. By implementing a real-world use case, this repository aims to bridge the gap between theoretical knowledge and practical application in the AWS cloud environment.
