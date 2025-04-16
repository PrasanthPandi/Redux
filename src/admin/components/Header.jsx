import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { MdMenuOpen } from "react-icons/md";
import { FaSun, FaMoon } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ThemeContext } from "../adminLayout";

const Header = ({ onSearch, onMenuToggle }) => {
  const theme = useTheme();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize); //whenever the window size changes, run the handleResize function.
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true }); // Redirects without adding a new history entry
    //replace: true   user can’t go back to the previous page using the back button
    window.location.reload();
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: theme.palette.white.primary }}
    >
      <Toolbar className="d-flex justify-content-between">
        {isMobile ? (
          <>
            <Link
              to="/"
              className="d-flex align-items-center text-decoration-none"
            >
              <img src={logo} alt="Logo" style={{ width: "90px" }} />
            </Link>

            {/* Right side: Icons */}
            <div className="d-flex align-items-center gap-3">
              <IconButton onClick={toggleDarkMode}>
                {darkMode ? (
                  <FaSun style={{ color: theme.palette.black.primary }} />
                ) : (
                  <FaMoon style={{ color: theme.palette.black.primary }} />
                )}
              </IconButton>

              <IconButton onClick={handleMenu}>
                <AccountCircle style={{ color: theme.palette.black.primary }} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                  My Account
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/settings">
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

              <IconButton onClick={onMenuToggle}>
                <MdMenuOpen
                  size={24}
                  style={{ color: theme.palette.blue.main }}
                />
              </IconButton>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex align-items-center gap-3">
              <Link
                to="/"
                className="d-flex align-items-center text-decoration-none"
              >
                <img src={logo} alt="Logo" style={{ width: "90px" }} />
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    color: theme?.palette?.blue?.tealblue || "#007bff",
                    marginLeft: "8px",
                    fontSize: "1.1rem",
                    textAlign: "center",
                  }}
                >
                  Munniyandi <br /> Villas
                </Typography>
              </Link>
              <IconButton
                onClick={onMenuToggle}
                style={{
                  color: theme.palette.black.primary,
                  border: `2px solid ${theme.palette.black.primary}`, // Black border
                  borderRadius: "8px", // Adjust the border radius
                  marginLeft: "55px",
                  padding: "4px", // Optional for spacing inside the button
                }}
              >
                <MdMenuOpen size={30} />
              </IconButton>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f0f0f0",
                  padding: "0 8px",
                  borderRadius: "4px",
                }}
              >
                <SearchIcon />
                <InputBase
                  placeholder="Search..."
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>

              <IconButton onClick={toggleDarkMode}>
                {darkMode ? (
                  <FaSun style={{ color: theme.palette.black.primary }} />
                ) : (
                  <FaMoon style={{ color: theme.palette.black.primary }} />
                )}
              </IconButton>

              <IconButton onClick={handleMenu}>
                <AccountCircle style={{ color: theme.palette.black.primary }} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                  My Account
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/settings">
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
