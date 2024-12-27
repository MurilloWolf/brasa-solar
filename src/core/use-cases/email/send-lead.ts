import { UseCases } from "..";
import {
  IEmailRepository,
  SendEmailDTO,
} from "../../repository/email.repository";
import comercialEmailHtml from "./templates/comercial.email";
import leadEmailHtml from "./templates/lead.email";

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const BusinessData = {
  data: {
    from: "angelo@brasasolar.com",
    subject: "<strong>☀ Brasa Solar - Contato</strong>",
    html: "",
    tags: [{ name: "Comercial", value: "Proposta" }],
  },
};

/**
 * @description Send lead to @brasasolar and send comercial proposal to the lead
 */
export class SendLead implements UseCases {
  constructor(private repository: IEmailRepository) {
    this.repository = repository;
  }

  mountLeadEmail({ email, name, message, phone }: LeadForm) {
    return leadEmailHtml
      .replace("$email", email)
      .replace("$name", name)
      .replace("$message", message)
      .replace("$phone", phone);
  }

  async execute({ email, name, message, phone }: LeadForm) {
    // send lead to @brasasolar
    const leadData = {
      email: "vendas@brasasolar.com",
      data: {
        ...BusinessData.data,
        from: "angelo@brasasolar.com",
        html: this.mountLeadEmail({ email, name, message, phone }),
      },
    };
    const leadResponse = await this.repository.sendEmail(leadData);

    // send comercial proposal to the lead
    const comercialData = {
      email,
      ...BusinessData.data,
      html: comercialEmailHtml,
    };
    const comercialResponse = await this.repository.sendEmail({
      email,
      data: comercialData,
    });

    return { leadResponse, comercialResponse };
  }
}
