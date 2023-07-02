import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { params } from "../entity/params";

async function sendEmail(senderName: string, senderEmail: string, receiverEmail: string,  subject: string, text: string): Promise<void> {

      const host = await params.findOne ({where: { param: "Platform_Email_Host" }});
      const port = await params.findOne ({where: { param: "Platform_Email_Port" }});
      const user = await params.findOne ({where: { param: "Platform_Email_User" }});
      const pass = await params.findOne ({where: { param: "Platform_Email_Password" }});                  
      
      var transport = nodemailer.createTransport({
        host: host?.strValue,
        port: port?.intValue,
        auth: {
          user: user?.strValue,
          pass: pass?.strValue
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