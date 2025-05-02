// import React, { createContext, useContext, useState, useEffect } from "react";

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [isNight, setIsNight] = useState(true);

//   useEffect(() => {
//     const root = document.documentElement;
//     if (isNight) {
//       root.style.setProperty('--primary-bg', '#2A3133');
//       root.style.setProperty('--secondary-bg', '#2A3133');
//       root.style.setProperty('--sidebar-bg', '#2A3133');
//       root.style.setProperty('--accent-color', '#FFFFFF');
//       root.style.setProperty('--text-primary', '#FFFFFF');
//       root.style.setProperty('--text-secondary', '#5C7C89');
//       root.style.setProperty('--card-bg', '#242424');
//       root.style.setProperty('--border-color', '#5C7C89');
//     } else {
//       root.style.setProperty('--primary-bg', '#FFFFFF');
//       root.style.setProperty('--secondary-bg', '#e6ecf1');
//       root.style.setProperty('--sidebar-bg', '#ABC3CD');
//       root.style.setProperty('--accent-color', '#000000');
//       root.style.setProperty('--text-primary', '#1F4959');
//       root.style.setProperty('--text-secondary', '#5C7C89');
//       root.style.setProperty('--card-bg', '#FFFFFF');
//       root.style.setProperty('--border-color', '#d1dbe5');
//     }
//   }, [isNight]);

//   return (
//     <ThemeContext.Provider value={{ isNight, setIsNight }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// } 
import React, { createContext, useContext, useState, useEffect } from "react"; 

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isNight, setIsNight] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      if (isNight) {
        root.style.setProperty('--primary-bg', '#2A3133');
        root.style.setProperty('--secondary-bg', '#2A3133');
        root.style.setProperty('--sidebar-bg', '#353a3a');
        root.style.setProperty('--accent-color', '#FFFFFF');
        root.style.setProperty('--text-primary', '#FFFFFF');
        root.style.setProperty('--text-secondary', '#5C7C89');
        root.style.setProperty('--card-bg', '#353a3a');
        root.style.setProperty('--border-color', '#5C7C89');
        root.style.setProperty('--main-content-bg', '#606364');
      } else {
        root.style.setProperty('--primary-bg', '#FFFFFF');
        root.style.setProperty('--secondary-bg', '#e6ecf1');
        root.style.setProperty('--sidebar-bg', '#ABC3CD');
        root.style.setProperty('--accent-color', '#000000');
        root.style.setProperty('--text-primary', '#1F4959');
        root.style.setProperty('--text-secondary', '#5C7C89');
        root.style.setProperty('--card-bg', '#FFFFFF');
        root.style.setProperty('--border-color', '#d1dbe5');
        root.style.setProperty('--main-content-bg', '#e6ecf1');
      }

      // Apply colors using JS for non-CSS styled components
      const body = document.body;
      body.style.backgroundColor = getComputedStyle(root).getPropertyValue('--main-content-bg');

      setTimeout(() => {
        const mainContent = document.querySelector(".dashboard-main");
        if (mainContent) {
          mainContent.style.backgroundColor = getComputedStyle(root).getPropertyValue('--main-content-bg');
        }

        const sidebar = document.querySelector(".sidebar");
        if (sidebar) {
          sidebar.style.backgroundColor = getComputedStyle(root).getPropertyValue('--sidebar-bg');
        }

        const cards = document.querySelectorAll(".task-card");
        cards.forEach(card => {
          card.style.backgroundColor = getComputedStyle(root).getPropertyValue('--card-bg');
          card.style.color = getComputedStyle(root).getPropertyValue('--text-primary');
        });
      }, 0); // short delay to wait for elements to load
    };

    applyTheme();
  }, [isNight]);

  return (
    <ThemeContext.Provider value={{ isNight, setIsNight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
