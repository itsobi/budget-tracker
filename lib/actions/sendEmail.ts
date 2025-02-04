'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return {
      success: false,
      message: 'Please fill in all fields',
    };
  }

  const { error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['obi.j.obialo@gmail.com'],
    subject: 'TracKiT Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: 'Email sent successfully 💪',
  };
};
