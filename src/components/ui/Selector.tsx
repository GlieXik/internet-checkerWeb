import { CSSProperties, useCallback } from "react";
import Select from "react-select/creatable";

import { useOptions } from "../../hooks/useOptions";

const groupBadgeStyles: CSSProperties = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

interface GroupType {
  label: string;
  options: { value: string; label: string }[];
}
const groupStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const formatGroupLabel = (data: GroupType) => {
  return (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
};

interface SelectorProps {
  value: SelectIp | null;
  setValue: (values: SelectIp) => void;
}

export const Selector = ({ value, setValue }: SelectorProps) => {
  const { options, handleCreate } = useOptions();

  const displayValue = useCallback((values: SelectIp | null) => {
    if (values === null || (values.value === "" && values.label === "")) {
      return null;
    } else {
      return values;
    }
  }, []);

  return (
    <div
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
        IP Address
      </span>
      <Select
        value={displayValue(value)}
        onChange={(newValue) => {
          if (newValue === null) return;
          setValue(newValue);
        }}
        onCreateOption={handleCreate}
        placeholder="Select or type an IP address"
        options={options}
        formatGroupLabel={
          formatGroupLabel as ((_: unknown) => React.ReactNode) | undefined
        }
        name="ip-address"
        styles={{
          control: (styles) => ({
            ...styles,
            backgroundColor: "dark",
            color: "white",
            borderRadius: "0.5rem",
          }),
          input: (styles) => ({ ...styles, color: "white", padding: "0.5rem" }),
          placeholder: (styles) => ({
            ...styles,
            padding: "0.5rem",
            fontSize: "0.8rem",
          }),
          menu: (styles) => ({ ...styles, backgroundColor: "#1a1a1a" }),
          singleValue: (styles) => ({
            ...styles,
            color: "white",
            padding: "0.5rem",
          }),
          option: (styles, { isDisabled, isFocused }) => {
            return {
              ...styles,

              backgroundColor: !isFocused ? "#1a1a1a" : "#2c2c2c",
              cursor: isDisabled ? "not-allowed" : "default",
            };
          },
        }}
      />
    </div>
  );
};
