import Express, { Request, Response, Router, json } from "express";
import { dbConfig } from "./config/dbConfig";
import sql from "mssql";
import user_router from "./routes/userRoutes";
import cors from 'cors'
import productRouter from "./routes/productRoutes";


const app = Express();
app.use(cors());
app.use(json());

const port = 3000;

// app.get('/',()=>{
//     console.log("perez changes")
// })


app.use("/products",productRouter)
app.use("/user", user_router);

app.listen(port, () => {
  console.log(
    "hello I am connected to the server................running on this port",
    port
  );
});
