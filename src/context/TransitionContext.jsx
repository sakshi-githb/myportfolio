import React, { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

export const TransitionProvider = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionText, setTransitionText] = useState("");
  const [fromTheme, setFromTheme] = useState({
    bg: "#111111",
    text: "#450011",
    accent: "#FFD4D9",
    palette: ["#FFD4D9", "#111111"],
  });
  const [toTheme, setToTheme] = useState({
    bg: "#111111",
    text: "#450011",
    accent: "#FFD4D9",
    palette: ["#FFD4D9", "#111111"],
  });

  return (
    <TransitionContext.Provider
      value={{
        isAnimating,
        setIsAnimating,
        transitionText,
        setTransitionText,
        fromTheme,
        setFromTheme,
        toTheme,
        setToTheme,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};
