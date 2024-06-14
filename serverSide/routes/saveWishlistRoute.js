import { Router } from "express";
const router = Router();


import { savewishlist }from "../controller/savewishlistController.js";

router.route('/').put(savewishlist);
router.route('/').get(savewishlist);
router.route('/').delete(savewishlist);

export default router;  