import { NavLink } from "react-router-dom";
import { FaHouse, FaChartColumn, FaCircleInfo, FaGear } from "react-icons/fa6";

export default function Navbar() {
  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    background: "rgba(20, 20, 20, 0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    zIndex: 1000,
  };

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    color: isActive ? "#c9f29b" : "#888",
    fontSize: 22,
    textDecoration: "none",
    transition: "color 0.2s",
    position: "relative",
  });

  const dotStyle = {
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: "#c9f29b",
    transition: "transform 0.2s, opacity 0.2s",
  };

  return (
    <nav style={navStyle}>
      <NavLink style={linkStyle} to="/">
        {({ isActive }) => (
          <>
            <FaHouse />
            <div
              style={{
                ...dotStyle,
                transform: isActive ? "scale(1)" : "scale(0)",
                opacity: isActive ? 1 : 0,
              }}
            />
          </>
        )}
      </NavLink>
      <NavLink style={linkStyle} to="/stats">
        {({ isActive }) => (
          <>
            <FaChartColumn />
            <div
              style={{
                ...dotStyle,
                transform: isActive ? "scale(1)" : "scale(0)",
                opacity: isActive ? 1 : 0,
              }}
            />
          </>
        )}
      </NavLink>
      <NavLink style={linkStyle} to="/info">
        {({ isActive }) => (
          <>
            <FaCircleInfo />
            <div
              style={{
                ...dotStyle,
                transform: isActive ? "scale(1)" : "scale(0)",
                opacity: isActive ? 1 : 0,
              }}
            />
          </>
        )}
      </NavLink>
      <NavLink style={linkStyle} to="/settings">
        {({ isActive }) => (
          <>
            <FaGear />
            <div
              style={{
                ...dotStyle,
                transform: isActive ? "scale(1)" : "scale(0)",
                opacity: isActive ? 1 : 0,
              }}
            />
          </>
        )}
      </NavLink>
    </nav>
  );
}
