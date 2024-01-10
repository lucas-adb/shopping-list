import signupGirl from "../assets/signup-girl.png";
import { motion } from "framer-motion";

export const MotionSignup = () => (
  <motion.img
    src={signupGirl}
    key={signupGirl}
    alt="woman-waiving"
    initial={{ opacity: 0, scale: 0.5}}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeIn" }}
    whileHover={{ scale: 1.02 }}
  />
)