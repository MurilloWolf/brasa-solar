"use server";

import { ResendEmailSender } from "@/core/infra/email/resend";
import { SendLead } from "@/core/use-cases/email/send-lead";

interface ContactForm {
  name: string;
  email: string;
  message: string;
  phone: string;
}

export async function sendMail(data: ContactForm) {
  if (!data.name || !data.email || !data.message) {
    return { status: 400, message: "Missing required fields" };
  }

  const sendMailUseCase = new SendLead(new ResendEmailSender());
  const { comercialResponse, leadResponse } = await sendMailUseCase.execute({
    ...data,
  });

  console.info("comercialResponse", comercialResponse);
  console.info("leadResponse", leadResponse);

  if (comercialResponse.success && leadResponse.success) {
    return { status: 200, message: "Email sent successfully" };
  }

  return { status: 500, message: "Internal server error" };
}
