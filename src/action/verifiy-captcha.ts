'use server';

export async function VerifyCaptcha(token: string): Promise<JSON> {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: 'POST',
    },
  );
  return await response.json();
}
