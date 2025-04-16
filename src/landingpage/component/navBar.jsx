import { useState } from "react";
import { Container, Nav, Navbar, Offcanvas, Button, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout } from "../../redux/authSlice";

const NavBar = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({ userName: "", email: "", password: "", role: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Ensures correct navigation after login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles Signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));

    if (result.payload) {
      setShowSignup(false);
      setShowLogin(true);
      sessionStorage.setItem("isLoggedIn", "false"); // Ensures manual login
      setFormData({ userName: "", email: "", password: "", role: "" });
    }
  };

  // Handles Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (result.payload) {
      sessionStorage.setItem("isLoggedIn", "true");
      setShowLogin(false);
      setFormData({ userName: "", email: "", password: "", role: "" });

      // Ensures navigation after Redux updates
      setTimeout(() => {
        navigate(result.payload.role === "admin" ? "/admin/dashboard" : "/");
      }, 500);
    }
  };

  // Handles Logout
  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/products", label: "Products" },
    { path: "/blogs", label: "Blogs" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <Navbar expand="lg" className="bg-dark mb-0 py-0">
        <Container fluid className="bg-dark p-3">
          <Navbar.Brand as={Link} to="/" className="text-white">Muniyandi</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-white">
            <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
          </Navbar.Toggle>

          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end" className="bg-dark text-white">
            <Offcanvas.Header closeButton className="bg-dark text-white">
              <Offcanvas.Title id="offcanvasNavbarLabel">Muniyandi Villas</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="bg-dark text-white">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {navLinks.map((link, index) => (
                  <Nav.Link key={index} as={Link} to={link.path} className="text-white">
                    {link.label}
                  </Nav.Link>
                ))}

                {!user ? (
                  <>
                    <Button variant="outline-light" className="me-2" onClick={() => setShowSignup(true)}>
                      Signup
                    </Button>
                    <Button variant="outline-light" onClick={() => setShowLogin(true)}>
                      Login
                    </Button>
                  </>
                ) : (
                  <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Signup Modal */}
      <Modal show={showSignup} onHide={() => setShowSignup(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="userName" placeholder="Enter your name" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" onChange={handleChange} required>
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
            <Button variant="dark" type="submit">Signup</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" onChange={handleChange} required>
                <option value="">Select your role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
            <Button variant="dark" type="submit">Login</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NavBar;
