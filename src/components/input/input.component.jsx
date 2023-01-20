import React from "react";

function InputComponent({ placeholder, label, onChange, value }) {
  let classNames = "bg-accent border p-2 pt-3 relative";

  if (label) classNames += " mt-3";

  return (
    <>
      <div className={classNames}>
        {label ? (
          <small className="absolute top-[-10px] left-4 bg-accent border px-2 select-none">
            {label}
          </small>
        ) : null}
        <input
          className="bg-transparent w-full outline-none"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
}

export default React.memo(InputComponent);
