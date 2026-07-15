import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  style = {},
  ...props
}) => {
  const variants = {
    primary: {
      background: "#4caf50",
      color: "white",
      hover: "#45a049",
    },
    secondary: {
      background: "rgba(255,255,255,0.1)",
      color: "white",
      hover: "rgba(255,255,255,0.2)",
    },
    danger: {
      background: "#f44336",
      color: "white",
      hover: "#d32f2f",
    },
    ghost: {
      background: "transparent",
      color: "white",
      hover: "rgba(255,255,255,0.1)",
    },
  };

  const sizes = {
    sm: { padding: "6px 16px", fontSize: "0.875rem" },
    md: { padding: "10px 24px", fontSize: "1rem" },
    lg: { padding: "14px 32px", fontSize: "1.1rem" },
  };

  const variantStyle = variants[variant] || variants.primary;
  const sizeStyle = sizes[size] || sizes.md;

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        background: variantStyle.background,
        color: variantStyle.color,
        border:
          variant === "ghost" ? "1px solid rgba(255,255,255,0.2)" : "none",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s",
        width: fullWidth ? "100%" : "auto",
        fontWeight: "500",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = variantStyle.hover;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = variantStyle.background;
        }
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
