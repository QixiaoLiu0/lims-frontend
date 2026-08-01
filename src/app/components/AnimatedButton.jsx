import { motion } from "motion/react";

export default function AnimatedButton({ children, className, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
