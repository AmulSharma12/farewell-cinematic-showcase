import { Link, useLocation } from "react-router-dom";
import { Home, Clock, Heart, MessageCircle, Star } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const links = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/journey", icon: Clock, label: "Journey" },
    { path: "/memories", icon: Heart, label: "Memories" },
    { path: "/messages", icon: MessageCircle, label: "Messages" },
    { path: "/farewell", icon: Star, label: "Farewell" },
  ];

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-3 shadow-xl">
      <ul className="flex gap-8 items-center">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  isActive
                    ? "text-accent scale-110"
                    : "text-foreground/70 hover:text-foreground hover:scale-105"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium hidden md:inline">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
