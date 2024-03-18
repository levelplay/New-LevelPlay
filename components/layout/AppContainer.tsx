import React from "react";

export const AppContainer = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return (
    <div
      {...props}
      className={`w-full mx-auto px-4 sm:px-6 max-w-7xl ${props.className}`}
    >
      {props.children}
    </div>
  );
};
