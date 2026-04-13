import { useNavigate, useLocation } from 'react-router-dom';
import { useTransition } from '../context/TransitionContext';
import { THEMES } from '../constants/themes';

const TransitionLink = ({ to, children, className, onMouseEnter, onMouseLeave }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAnimating, setTransitionText, setFromTheme, setToTheme } = useTransition();

  const handleLinkClick = (e) => {
    e.preventDefault();

    // Prevent re-navigating to the same page
    if (location.pathname === to) return;

    // Identify current and target themes
    const currentTheme = THEMES[location.pathname] || THEMES['/'];
    const targetTheme = THEMES[to] || THEMES['/'];

    setFromTheme(currentTheme);
    setToTheme(targetTheme);

    // Map destination path to readable text
    const textMap = {
      '/': 'HOME',
      '/about': 'ABOUT ME',
      '/projects': 'MY PROJECTS',
      '/contact': 'CONTACT ME'
    };

    const targetText = textMap[to] || 'LOADING';

    // Start transition
    setTransitionText(targetText);
    setIsAnimating(true);

    // Wait for strips to fully cover the screen (Entrance 0.8s + stagger amount 0.4s)
    setTimeout(() => {
      navigate(to);
      
      // Allow new page to mount slightly then start exit sweep
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 1250);
  };

  return (
    <a 
      href={to} 
      onClick={handleLinkClick} 
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
};

export default TransitionLink;
