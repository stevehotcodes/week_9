import ejs from 'ejs'
import mssql from 'mssql'
import dotenv from 'dotenv'
import { sqlConfig } from '../config/dbConfig'
import { sendMail } from '../helpers/emailHelper'
import { IUserDetails } from '../interfaces/userInterfaces'
import { IorderDetailsWithUserInfo } from '../interfaces/orderInterface'
dotenv.config()

export const notificationShipping = async() =>{
    const pool = await mssql.connect(sqlConfig)

    const order:IorderDetailsWithUserInfo[] = await (await pool.request().query(`SELECT * FROM orders WHERE orderStatus='shipping' AND isEmailSent=0`)).recordset

    console.log("orders under shipping status",order);
    

    for (let item of order){
        ejs.renderFile('templates/notificationShipping.ejs', {Name: item.customerFirstname, productOrderedName:item.productName,productQuantity:item.quantity}, async(error, data)=>{
            let mailOptions = {
                from: process.env.EMAIL as string,
                to: item.customerEmail,
                subject: "SHIPPING NOTIFICATION",
                html: data
            }

            try {
                await sendMail(mailOptions)

                await pool.request().query('UPDATE orders SET isEmailSent = 1 WHERE isEmailSent = 0')

                console.log(`Notifying customer${item.customerFirstname} their order is under shipping status`);
                
            } catch (error) {
                console.log(error);
                
            }
        })
    }
}