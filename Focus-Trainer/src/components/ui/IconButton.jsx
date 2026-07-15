import React from "react";
import { motion } from "framer-motion";

const IconButton = ({
  icon: Icon,
  onClick,
  label = "",
  variant = "ghost",
  size = "md",
  style = {},
  ...props
}) => {
  const sizes = {
    sm: { padding: "6px", fontSize: "16px" },
    md: { padding: "10px", fontSize: "20px" },
    lg: { padding: "14px", fontSize: "24px" },
  };

  const sizeStyle = sizes[size] || sizes.md;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      style={{
        padding: sizeStyle.padding,
        background: "transparent",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
        color: "white",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
      aria-label={label}
      {...props}
    >
      <Icon size={sizeStyle.fontSize} />
    </motion.button>
  );
};

export default IconButton;
