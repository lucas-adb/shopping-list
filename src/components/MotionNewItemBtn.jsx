import { FaCirclePlus } from "react-icons/fa6";
import { motion } from "framer-motion";

export const MotionNewItemBtn = () => (
  <motion.button
    type="submit"
    className="add-new-item-btn"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <FaCirclePlus />
  </motion.button>
)