interface Props {
  label: string;
  onClick: () => void;
  classNames?: string;
}

const Button = ({ label, onClick, classNames }: Props) => {
  const classes = `border-2 px-4 py-1 rounded-full shadow mx-4  `;
  return (
    <button onClick={onClick} className={classes + classNames}>
      {label}
    </button>
  );
};

export default Button;
