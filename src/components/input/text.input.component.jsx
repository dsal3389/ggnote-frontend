import React from "react";

function TextInputComponent({
  label,
  className,
  style,
  value,
  onChange,
  minHeight = "300px",
  maxHeight = "unset",
}) {
  let classNames = "w-full h-full p-2 border bg-accent relative";

  if (label) classNames += " mt-3";
  if (className) classNames += ` ${className}`;

  return (
    <>
      <div className={classNames} style={style}>
        {label ? (
          <small className="absolute top-[-10px] left-4 bg-accent border px-2 select-none">
            {label}
          </small>
        ) : null}
        <textarea
          className="w-full h-full bg-transparent outline-none"
          style={{ minHeight: minHeight, maxHeight: maxHeight }}
          onChange={onChange}
          value={value}
        ></textarea>
      </div>
    </>
  );
}

export default React.memo(TextInputComponent);
