import { Router } from "express";
import { createNewProduct, deleteProduct, getAProduct, getProducts, updateProduct } from "../controllers/productControllers";




const productRouter=Router();

productRouter.post("/new",createNewProduct)
productRouter.get("/all",getProducts)
productRouter.get("/category/:category",getProducts);
productRouter.get("/one/:id",getAProduct)
productRouter.put("/:id",updateProduct)
productRouter.delete("/:id",deleteProduct)






export default productRouter