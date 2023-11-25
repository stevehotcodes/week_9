import  Express, { Request, Response, Router, json }  from "express";
import { dbConfig } from "./config/dbConfig";

import sql from "mssql"


import cors from 'cors'

const app = Express();
app.use(cors())
app.use(json())

const port =3000




app.get('/',()=>{
    console.log("perez changes")
})


app.listen(port,()=>{
    console.log("hello I am connected to the server................running on this port", port);
})