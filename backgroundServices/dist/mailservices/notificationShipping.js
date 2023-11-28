"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationShipping = void 0;
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConfig_1 = require("../config/dbConfig");
const emailHelper_1 = require("../helpers/emailHelper");
dotenv_1.default.config();
const notificationShipping = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(dbConfig_1.sqlConfig);
    const order = yield (yield pool.request().query(`SELECT * FROM orders WHERE orderStatus='shipping' AND isEmailSent=0`)).recordset;
    console.log("orders under shipping status", order);
    for (let item of order) {
        ejs_1.default.renderFile('templates/notificationShipping.ejs', { Name: item.customerFirstname, productOrderedName: item.productName, productQuantity: item.quantity }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let mailOptions = {
                from: process.env.EMAIL,
                to: item.customerEmail,
                subject: "SHIPPING NOTIFICATION",
                html: data
            };
            try {
                yield (0, emailHelper_1.sendMail)(mailOptions);
                yield pool.request().query('UPDATE orders SET isEmailSent = 1 WHERE isEmailSent = 0');
                console.log(`Notifying customer${item.customerFirstname} their order is under shipping status`);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.notificationShipping = notificationShipping;
