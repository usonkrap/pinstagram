import { noun, adjective } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomN = Math.floor(Math.random() * noun.length);
  return `${adjective[randomN]} ${noun[randomN]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "admin@pinstagram.com",
    to: adress,
    subject: "🔒Login Secret for Pinstagram",
    html: `Hello! Your login secret is <strong>${secret}</strong><br/><br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};
