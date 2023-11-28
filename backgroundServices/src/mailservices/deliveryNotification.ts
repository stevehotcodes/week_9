import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../config/dbConfig'
import { sendMail } from '../helpers/emailHelper'
import { IUserDetails } from '../interfaces/userInterfaces'
import { IorderDetailsWithUserInfo } from '../interfaces/orderInterface'
dotenv.config()

export const notificationDelivery = async() =>{
    const pool = await mssql.connect(sqlConfig)

    const order:IorderDetailsWithUserInfo[] = await (await pool.request().query(`SELECT * FROM orders WHERE orderStatus='shipped' AND isEmailSent=1`)).recordset

    console.log("orders delivered status",order);
    

    for (let item of order){
        ejs.renderFile('templates/notificationDelivery.ejs', {Name: item.customerFirstname}, async(error, data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string,
                to: item.customerEmail,
                subject: "DELIVERY NOTIFICATION",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE orders SET isDelivered = 1 WHERE isDelivered = 0')

                console.log(`Notifying customer${item.customerFirstname} their order has been  delivered`);
                
            } catch (error) {
                console.log(error);
                
            }
        })
    }
}