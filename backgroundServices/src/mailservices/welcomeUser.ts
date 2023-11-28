import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../config/dbConfig'
import { sendMail } from '../helpers/emailHelper'
import { IUserDetails } from '../interfaces/userInterfaces'
dotenv.config()

export const welcomeUser = async() =>{
    const pool = await mssql.connect(sqlConfig)

    const users:IUserDetails[] = await (await pool.request().query('SELECT * FROM users WHERE isWelcomed= 0')).recordset

    console.log(users);
    

    for (let user of users){
        ejs.renderFile('templates/welcomeUser.ejs', {Name: user.firstname}, async(error, data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string,
                to: user.email,
                subject: "Welcome Onboard",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE users SET isWelcomed= 1 WHERE isWelcomed = 0')

                console.log('Emails send to new users');
                
            } catch (error) {
                console.log(error);
                
            }
        })
    }
}