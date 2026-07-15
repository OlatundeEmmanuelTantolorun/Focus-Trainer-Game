import React from "react";
import { motion } from "framer-motion";

const Card = ({
  children,
  hover = false,
  style = {},
  className = "",
  ...props
}) => {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            }
          : {}
      }
      transition={{ duration: 0.2 }}
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",
        padding: "20px",
        transition: "all 0.2s",
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
