import {
  IEmailRepository,
  ISendEmailResponse,
  SendEmailDTO,
} from "@/core/repository/email.repository";
import { Resend } from "resend";

export class ResendEmailSender implements IEmailRepository {
  resend = new Resend(process.env.RESEND_API_KEY);

  async sendEmail({ email, data }: SendEmailDTO): Promise<ISendEmailResponse> {
    const response = await this.resend.emails.send({
      to: email,
      from: data.from,
      subject: data.subject,
      html: data.html,
    });

    if (response.error) {
      return { success: false, message: `Erro ao enviar email para: ${email}` };
    }

    if (response.data && "id" in response.data)
      return {
        success: true,
        message: "Email enviado com sucesso",
        id: response.data.id as string,
      };

    return { success: false, message: "Resend internal error" };
  }
}
