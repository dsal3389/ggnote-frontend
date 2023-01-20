import React from "react";
import { Link } from "react-router-dom";

function BtnComponent({ href, onClick, type, disabled, children }) {
  let classNames = "border px-3 py-1 rounded-full duration-150 select-none";

  if (disabled) classNames += " bg-gray-300 dark:bg-gray-500 hover:none";
  else classNames += " hover:bg-gray-200/50 dark:hover:bg-gray-800/50";

  const button = (
    <button
      className={classNames}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );

  if (href) return <Link to={href}>{button}</Link>;
  return button;
}

export default React.memo(BtnComponent);
