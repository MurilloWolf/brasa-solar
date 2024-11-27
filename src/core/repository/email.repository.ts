export interface IEmailRepository {
  sendEmail(data: SendEmailDTO): Promise<ISendEmailResponse>;
}

export interface SendEmailDTO {
  email: string | string[];
  data: {
    from: string;
    subject: string;
    html: string;
    tags?: { name: string; value: string }[];
  };
}

export type SendEmailResponseSuccess = {
  success: true;
  message: string;
  id: string;
};

export type SendEmailResponseError = {
  success: false;
  message: string;
};

export type ISendEmailResponse =
  | SendEmailResponseSuccess
  | SendEmailResponseError;
