import shoppingCart from "../assets/shopping-cart.png";
import { motion } from "framer-motion";

export const MotionWomanCart = () => (
  <motion.img
    src={shoppingCart}
    key={shoppingCart}
    alt="shopping-cart-3d-illustration"
    initial={{ opacity: 0, scale: 0.8}}
    animate={{ opacity: 1, scale: 1, x: [-300, 20, 0], rotate: [0, -5, 0] }}
    transition={{ duration: 1, ease: "easeOut" }}
    whileHover={{ scale: 1.02 }}
  />
)