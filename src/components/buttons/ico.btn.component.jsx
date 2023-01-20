import { Link } from "react-router-dom";

export default function IcoBtnComponent({
  Icon,
  title,
  onClick,
  className,
  disabled,
  href,
}) {
  const classNames =
    "rounded-full border p-2 hover:bg-stone-500/5 " + className;
  const button = (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {Icon}
    </button>
  );

  if (href) return <Link to={href}>{button}</Link>;
  return button;
}
