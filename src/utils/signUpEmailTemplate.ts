import { sendEmail } from './emailSend';

export const signUpEmailTemplate = (email: string, username: string, create: string) => {
  const template = `
    <div style='text-align: center; width: 100%;'>
    <h1>hello ${username}</h1>
    <p>Welcome to blood fighter</p>
    <p>Your email is ${email}</p>
    <p>Create at ${create}</p>
    </div>
  `;

  sendEmail(email, 'Signup text', '', template);
};
