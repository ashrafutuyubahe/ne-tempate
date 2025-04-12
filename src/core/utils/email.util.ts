import nodemailer, { Transporter } from "nodemailer";
import { EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_USER } from "../config/env";
import { logger } from "../config/logger";
import path from "path"
import pug from "pug"

class EmailUtil {
    private static instance: EmailUtil | null = null;
    private  transporter: Transporter

    private constructor(){
        this.transporter = nodemailer.createTransport({
            host: EMAIL_HOST!,
            port: EMAIL_PORT,
            secure: false,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        })
    }

    async sendEmailWithTemplate(
        to: string, 
        subject: string, 
        templateName: string, 
        templateData?: Record<string, any>)
        {
        
        const templatePath = path.join(__dirname, "../templates", `${templateName}.pug`)   

        try {

            const html = pug.renderFile(templatePath, templateData)

            const mailOptions = {
                from: EMAIL_USER,
                to,
                subject,
                html
            }

            const info = await this.transporter.sendMail(mailOptions)
            logger.info("Email sent : ", info.response)
        } catch (error) {
            logger.error("Error sending email: ", error)
        }
    }

    public static getInstance(){
        if(!EmailUtil.instance)
            EmailUtil.instance = new EmailUtil()
        return EmailUtil.instance
    }

}


export const emailUtil = EmailUtil.getInstance()