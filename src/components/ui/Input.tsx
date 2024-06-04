interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input = ({ label, name, value, onChange }: InputProps) => {
  return (
    <label
      style={{
        width: "100%",
      }}
    >
      <span
        style={{
          marginBottom: "0.5rem",
          display: "inline-block",
        }}
      >
        {label}
      </span>
      <input type="text" name={name} value={value} onChange={onChange} />
    </label>
  );
};
