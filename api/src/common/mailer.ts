import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

async function sendEmail(senderName: string, senderEmail: string, receiverEmail: string,  subject: string, text: string): Promise<void> {

      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "c09e9a77d9d52a",
          pass: "bc5320d12428c3"
        }
      });  

      try {
        await transport.sendMail({
          from: `"${senderName}" <${senderEmail}>`,
          to: receiverEmail,
          subject: subject,
          //text: text,
          html: text,
          //headers: { 'x-myheader': 'test header' }
        })
      } catch (err: any) {
          throw (  err.toString() + "  error occurred" )
      }

}

export {sendEmail}