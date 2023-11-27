import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { ImailConfigs } from '../interfaces/mailConfigsInterface'
dotenv.config()


function createTransport(config:ImailConfigs){
    const transporter =nodemailer.createTransport(config)
    console.log(config)
    return transporter

}

let configurations: ImailConfigs = ({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL as string ,
        
        pass: process.env.PASSWORD  as string
    }
})

console.log(process.env.EMAIL)

export const sendMail= async(messageOption:any)=>{
    const transporter =await createTransport(configurations)
    await transporter.verify()
    await transporter.sendMail(messageOption, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log(info.response); 
        }
    })
}
