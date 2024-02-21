import {Router} from "express";
const router = Router();

// import all controller
import * as controller from "../controller/appController"


//post method
router.route("/register").post(controller.register)
// router.route("/registerMail").post();
router.route("/authenticate").post((req, res) => res.end());
router.route("/login").post(controller.login);

//get method
router.route("/user/:username").get(controller.getUser);
router.route("/generateOTP").get(controller.generateOTP)
router.route("/verifyOTP").get(controller.verifyOTP)
router.route("/createResetSession").get(controller.createResetSession);

// put methods
router.route("/updateuser").put(controller.updateUser)
router.route("/updateuser").put(controller.resetPassword)




export default router;