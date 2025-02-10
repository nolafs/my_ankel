'use server';

import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { z } from 'zod';

export const transformZodErrors = async (error: z.ZodError) => {
  return error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
};

const emailSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  enquiryType: z.string().min(1, 'Please select the nature of your enquiry'),
  message: z.string().min(1, 'Please enter your message'),
  agreeToTerms: z.boolean().refine(val => val, 'You must agree to the Terms & Conditions'),
});
export async function sendMail(formData: FormData) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY ?? '',
  });

  try {
    const validatedFields = emailSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      enquiryType: formData.get('enquiryType'),
      message: formData.get('message'),
      agreeToTerms: formData.get('agreeToTerms') === 'true',
    });

    const sentFrom = new Sender(`noreply@${process.env.MAILERSEND_DOMAIN}`, 'Mr Andrew Goldberg OBE');
    const recipients: Recipient[] = [new Recipient('info@goldbergpp.com', 'Contact Form Website')];

    if (validatedFields) {
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(`Contact submission: ${formData.get('enquiryType') as string}`)
        .setText(`Name: ${formData.get('name') as string}`)
        .setText(`Email: ${formData.get('email') as string}`)
        .setText(`Enquiry Type: ${formData.get('enquiryType') as string}`)
        .setText('Message:')
        .setHtml(`${(formData.get('message') as string) ?? ''}`);

      const mailer = await mailerSend.email.send(emailParams);

      console.log('email sent', mailer);
    }

    return {
      errors: null,
      data: 'data received and mutated',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        errors: transformZodErrors(error),
        data: null,
      };
    }

    return {
      errors: error,
      data: 'data received and mutated',
    };
  }
}
