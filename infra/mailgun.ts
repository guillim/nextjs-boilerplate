import Mailgun, { Interfaces } from 'mailgun.js';
import FormData from 'form-data';
import { providersList } from './providerDetector';


class MailgunWrapper {
  mailgun: Interfaces.IMailgunClient | null;
  constructor() {
    this.mailgun = null;
    if (providersList.mailgun.isAvailable) {
      this.initialize();
    }else{
      console.log('Mailgun not available. Missing API key');
    }
  }
  // quote the line abouth api.eu if your mailgun mail server is in the US
  private async initialize(){
    const mailgunClass = new Mailgun(FormData);
    this.mailgun = mailgunClass.client({
      username: 'api', 
      key: process.env.MAILGUN_API_KEY || '', 
      url: 'https://api.eu.mailgun.net'
    });
  }
  public getMailgun(){
    return this.mailgun;
  }
  public getDefaultValues(){
    return {
      from: "Paul <contact@acme.com>",
      subject: "Hello",
      to: [],
      text: "This is me testing emails!"
      // html: "<h1>Testing some Mailgun awesomness!</h1>"
    }
  }
} 

// making only one instace of MailgunWrapper for the whole project
const globalForMailgun = globalThis as unknown as { mailgun: MailgunWrapper }
 
export const mailgunClientGlobal = globalForMailgun.mailgun || new MailgunWrapper()

if (process.env.NODE_ENV !== "production") globalForMailgun.mailgun = mailgunClientGlobal


// how to use in your pages/api routes:
// import { mailgunClientGlobal } from '@/infra/mailgun';
// const mg = await mailgunClientGlobal
// await mg.mailgun?.messages.create(
//   'mail.mydomain.com',
//   {...mg.getDefaultValues(), 
//     from: 'Excited User <mailgun@mail.mydomain.com>',
//     to: ['contact@mydomain.com'] }
// );