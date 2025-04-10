import React from "react";

export function Card({ className, ...props }) {
  return (
    <div
      className={className}
      {...props}
    />
  );
}