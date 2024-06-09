import { useCallback, useContext } from "react";
import Select from "react-select/creatable";

import { ActionType, SelectorContext } from "../../context/selector.context";

export const Selector = () => {
  const { formState, dispatch, setLastSelected, lastSelected } =
    useContext(SelectorContext);

  const handleCreate = useCallback(
    (newValue: string) => {
      dispatch({
        type: ActionType.SET,
        payload: { value: newValue.toLowerCase(), label: newValue },
      });
      setLastSelected({ value: newValue.toLowerCase(), label: newValue });
    },
    [dispatch, setLastSelected]
  );

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
        value={lastSelected}
        onChange={(newValue) => {
          if (newValue === null) return;
          setLastSelected(newValue);
        }}
        onCreateOption={handleCreate}
        placeholder="Select or type an IP address"
        options={formState}
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
