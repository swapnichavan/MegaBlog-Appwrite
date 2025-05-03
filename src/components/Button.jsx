import React from "react";

function Button({
  children,
  className = "",
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  ...props
}) {
  return (
    <div
      className={`${className} ${type} ${bgColor} ${textColor} rounded-lg px-4 py-2`}
      {...props}
      // className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      <button>{children}</button>
    </div>
  );
}

export default Button;
