import  express  from "express";

// import all controller
import * as controller from "../controller/appController.js"
import Auth, {localVariables} from "../middleware/auth.js";
import { registerMail } from "../controller/mailer.js";

const router = express.Router();


//post method
router.route("/register").post(controller.register)
router.route("/registerMail").post(registerMail);
router.route("/authenticate").post(controller.verifyUser, (req, res) => res.end());
router.route("/login").post(controller.verifyUser, controller.login);

//get method
router.route("/user/:username").get(controller.getUser);
router.route("/generateOTP").get(controller.verifyUser, localVariables, controller.generateOTP)
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP)
router.route("/createResetSession").get(controller.createResetSession);

// put methods
router.route("/updateuser").put(Auth, controller.updateUser)
router.route("/resetPassword").put(controller.verifyUser, controller.resetPassword)


export default router;