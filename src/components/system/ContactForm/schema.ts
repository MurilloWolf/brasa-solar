import { z } from "zod";

export const contactFormInitialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const contactFormSchema = z.object({
  name: z.string().min(6, { message: "Digite o nome completo" }).max(255),
  email: z.string().email({ message: "Digite um email válido" }).max(255),
  phone: z
    .string({ message: "Somente números" })
    .min(10, { message: "Digite um telefone válido" })
    .max(15, { message: "Digite um telefone válido" })
    .optional(),
  message: z
    .string()
    .min(75, { message: "Dê mais contexto na sua mensagem" })
    .max(500, { message: "Mensagem muito longa" }),
});

export default contactFormSchema;
