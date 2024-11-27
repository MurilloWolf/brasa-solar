import { UseCases } from ".";
import { IEmailRepository, SendEmailDTO } from "../repository/email.repository";

export class SendEmail implements UseCases {
  constructor(private repository: IEmailRepository) {
    this.repository = repository;
  }

  async execute({ email, data }: SendEmailDTO) {
    return await this.repository.sendEmail({ email, data });
  }
}
