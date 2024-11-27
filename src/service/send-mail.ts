"use server";

import { ResendEmailSender } from "@/core/infra/email/resend";
import { SendEmail } from "@/core/use-cases/send-mail";

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

  const sendMailUseCase = new SendEmail(new ResendEmailSender());
  await sendMailUseCase.execute({
    email: data.email,
    data: {
      subject: "Requisição de orçamento",
      from: "maristelajoam@resend.dev",
      html: `<h1>Olá, ${data.name}</h1>`,
      tags: [
        {
          name: "category",
          value: "lead",
        },
      ],
    },
  });

  console.log("send mail");
}
