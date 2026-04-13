import TransitionLink from "./TransitionLink";

const Navbar = ({ onLinkHover, onLinkLeave, isContact }) => {
  return (
    <header className={`navbar ${isContact ? "navbar--contact" : ""}`}>
      <div className="nav-left">
        <TransitionLink to="/" className="logo">
          I BELIVE
        </TransitionLink>
      </div>

      <nav className="nav-center">
        <TransitionLink
          to="/"
          onMouseEnter={onLinkHover}
          onMouseLeave={onLinkLeave}
        >
          HOME
        </TransitionLink>
        <TransitionLink
          to="/about"
          onMouseEnter={onLinkHover}
          onMouseLeave={onLinkLeave}
        >
          ABOUT ME
        </TransitionLink>
        <TransitionLink
          to="/projects"
          onMouseEnter={onLinkHover}
          onMouseLeave={onLinkLeave}
        >
          MY PROJECTS
        </TransitionLink>
      </nav>

      <nav className="nav-right">
        <TransitionLink
          to="/contact"
          className="btn-glass-nav"
          onMouseEnter={onLinkHover}
          onMouseLeave={onLinkLeave}
        >
          CONTACT ME
        </TransitionLink>
      </nav>
    </header>
  );
};

export default Navbar;
