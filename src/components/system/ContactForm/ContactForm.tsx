import {
  Button,
  Form,
  FormField,
  FormItem,
  FormControl,
  Input,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/components/ui";
import contactFormSchema, { contactFormInitialValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader, SendHorizontal } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { sendMail } from "@/service/send-mail";
import Image from "next/image";
import mockupWoman from "@/assets/images/mockupWoman.png";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();

  const zform = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormInitialValues,
  });

  const handleSubmit = zform.handleSubmit(async () => {
    startTransition(async () => {
      // const response = await sendMail(zform.getValues());
      console.log("email sended");
    });
  });

  return (
    <section
      id="fale-conosco"
      className="py-16  lg:pb-4 bg-no-repeat bg-cover "
      style={{
        backgroundImage:
          "url('https://i0.wp.com/backgroundabstract.com/wp-content/uploads/edd/2022/01/19366-e1656150318511.jpg?resize=150150&ssl=1')",
      }}
    >
      <div className="container mx-auto text-center">
        <div>
          <h3 className="text-3xl sm:text-2xl md:text-4xl font-bold text-gray-900">
            Precisa de ajuda especializada?{" "}
          </h3>
          <p className="text-lg md:text-2xl text-gray-500 p-4">
            Envie uma mensagem e entraremos em contato.
          </p>
          <p className="px-2 text-lg text-gray-500"></p>
        </div>
        <div className=" md:flex flex-row justify-evenly items-center">
          <div className="mt-8 flex justify-center  md:w-2/4 md:shadow-lg bg-gray-50 py-8 px-2 rounded-md">
            <Form {...zform}>
              <form
                onSubmit={zform.handleSubmit(() => {})}
                className="w-full p-4 flex flex-col justify-evenly min-h-96 text-left gap-4"
              >
                <FormField
                  name="name"
                  control={zform.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:text-xs">
                      <FormLabel>Nome*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          placeholder="João Silva"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage className="font-extralight" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={zform.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:text-xs">
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="email"
                          placeholder="exemplo@gmail.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage className="font-extralight" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={zform.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:text-xs">
                      <FormLabel>Telefone com DDD</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="phone"
                          placeholder="(00) 00000-0000"
                          type="tel"
                          maxLength={15}
                          minLength={10}
                        />
                      </FormControl>
                      <FormMessage className="font-extralight" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="message"
                  control={zform.control}
                  render={({ field }) => (
                    <FormItem className="w-full md:text-xs">
                      <FormLabel>Mensagem*</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          maxLength={400}
                          {...field}
                          id="message"
                          placeholder="Olá eu sou @, gostaria de fazer um orçamento para N placas para o endereço X"
                        />
                      </FormControl>
                      <FormMessage className="font-extralight" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  onClick={handleSubmit}
                  className="rounded-sm text-lg bg-green-500 hover:bg-green-400 text-white py-3 px-6"
                >
                  {isPending ? (
                    <Loader className="animate-rotate " />
                  ) : (
                    <p className="flex justify-center items-center">
                      Enviar mensagem{" "}
                      <SendHorizontal className="ml-2 text-md" size={28} />
                    </p>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <Image
            src={mockupWoman}
            alt=""
            width={250}
            height={500}
            className="w-80 hidden md:block "
          />
        </div>
      </div>
    </section>
  );
}
