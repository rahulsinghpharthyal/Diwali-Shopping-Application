import { Router } from "express";
const router = Router();


import { sellerLogin } from "../controller/sellerLoginController.js";

router.route('/').post(sellerLogin);


export default router;