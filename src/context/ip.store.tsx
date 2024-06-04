import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "usehooks-ts";
const initialState: SelectIp = { value: "", label: "" };

export const IpContext = createContext<SelectIp>(initialState);
export const UpdateIpContext = createContext<React.Dispatch<SelectIp>>(
  () => {}
);
interface SelectIp {
  value: string;
  label: string;
}

export const useIp = () => {
  const context = useContext(IpContext);

  return context;
};

export const useUpdateIp = () => {
  const context = useContext(UpdateIpContext);

  return context;
};

export const IpProvider = ({ children }: { children: React.ReactNode }) => {
  const checkLocalStorage = () => {
    const local = localStorage.getItem("lastSelect");
    if (local) {
      return JSON.parse(local);
    }
    return initialState;
  };
  const [formState, dispatch] = useReducer(
    (state: SelectIp, action: SelectIp): SelectIp => {
      return { ...state, ...action };
    },
    checkLocalStorage()
  );
  const [_, setValues] = useLocalStorage("lastSelect", formState);

  const localSaveDispatch = (action: SelectIp) => {
    console.log(action);
    setValues(action);
    dispatch(action);
  };

  return (
    <IpContext.Provider value={formState}>
      <UpdateIpContext.Provider value={localSaveDispatch}>
        {children}
      </UpdateIpContext.Provider>
    </IpContext.Provider>
  );
};
