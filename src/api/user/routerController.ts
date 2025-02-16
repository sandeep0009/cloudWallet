import { Router } from "express";
import { Signin, SignUp, Transac} from "./userController";
const router=Router();


router.post('/signup',SignUp);
router.post('/signin',Signin);
router.post('/trax/sign',Transac);

export default router;