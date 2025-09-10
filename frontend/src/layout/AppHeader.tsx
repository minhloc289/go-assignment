import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";

// Hamburger Menu Icon Component
const HamburgerIcon: React.FC<{ isOpen?: boolean }> = ({ isOpen = false }) => (
  <svg
    className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
    />
  </svg>
);

// Menu Icon Component (for desktop)
const MenuIcon: React.FC = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const AppHeader: React.FC = () => {
  const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b shadow-sm">
      <div className="flex items-center justify-between w-full px-4 py-3 lg:px-6 lg:py-4">
        
        {/* Left side - Toggle button and Title */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Menu */}
          <button
            onClick={handleToggle}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
            aria-label="Toggle sidebar"
          >
            <HamburgerIcon isOpen={isMobileOpen} />
          </button>

          {/* Desktop Menu Toggle */}
          <button
            onClick={handleToggle}
            className="hidden lg:flex items-center justify-center w-9 h-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
            aria-label="Toggle sidebar"
            title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <MenuIcon />
          </button>

          {/* App Title */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors duration-200"
            >
              G-Scores
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;