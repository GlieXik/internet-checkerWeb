import { createContext, useEffect, useReducer, useState } from "react";
import { SelectIp } from "../ts/selector";
import { useLocalStorage } from "usehooks-ts";

export enum ActionType {
  SET = "SET",
  REMOVE = "REMOVE",
  REBASEALL = "REBASEALL",
}

type Action = { type: ActionType; payload: SelectIp };
type State = SelectIp[];

type SelectorContextType = {
  formState: State;
  dispatch: React.Dispatch<Action>;
  lastSelected: SelectIp | null;
  setLastSelected: React.Dispatch<React.SetStateAction<SelectIp | null>>;
};

const initialState: State = [];

export const SelectorContext = createContext<SelectorContextType>({
  formState: initialState,
  dispatch: () => {},
  lastSelected: null,
  setLastSelected: () => {},
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET":
      if (state.some((el) => el.value === action.payload.value)) {
        return state;
      }

      return [...state, action.payload];
    case "REMOVE":
      return state.filter((el) => el.value !== action.payload.value);

    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

export const SelectorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValues] = useLocalStorage("selector", initialState);

  const [formState, dispatch] = useReducer(reducer, value);
  const [lastSelected, setLastSelected] = useState<SelectIp | null>(null);

  const values = { formState, dispatch, lastSelected, setLastSelected };

  useEffect(() => {
    setValues(formState);
  }, [formState, setValues]);

  return (
    <SelectorContext.Provider value={values}>
      {children}
    </SelectorContext.Provider>
  );
};
