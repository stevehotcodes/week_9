import express from 'express'
import cron from 'node-cron'
import { welcomeUser } from './mailservices/welcomeUser'
import { notificationShipping } from './mailservices/notificationShipping'
import { notificationDelivery } from './mailservices/deliveryNotification'



const app = express()

const run = async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for a new user');
        
        await welcomeUser()
    
    })
    
}
const shippingNotification = async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for orders with status of shipping');
        await notificationShipping()
    })
    
}

const deliveryNotification = async()=>{
    cron.schedule('*/10 * * * * *', async()=>{
        console.log('Checking for orders with status of shipping');
        await notificationDelivery()
    })
    
}

run()
shippingNotification()
deliveryNotification()


app.listen(4401, ()=>{
    console.log('Mail server up and running ................'); 
})