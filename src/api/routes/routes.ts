import { Router } from "express";
import { AccountController } from "../controllers/account-controller";

const router: Router = Router();

//#region Account 

router.post('/signup', AccountController.signup);
router.get('/getAccountByEmail', AccountController.getAccountByEmail);

//#endregion

export default router;