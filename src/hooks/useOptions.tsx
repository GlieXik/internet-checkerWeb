import { useLocalStorage } from "usehooks-ts";
import { useUpdateIp } from "../context/ip.store";

const defaultOptions: SelectIp[] = [];
const groupedOptions = [
  {
    label: "Previously Selected",
    options: defaultOptions,
  },
];
export const useOptions = () => {
  const [options, setOptions] = useLocalStorage("selects", groupedOptions);
  const dispatch = useUpdateIp();

  const createOption = (label: string) => ({
    label,
    value: label.toLowerCase(),
  });

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue);

    setOptions((prev: any) =>
      prev.map((group: any) => {
        if (
          group.options.some(
            (option: SelectIp) => option.value === newOption.value
          )
        ) {
          return group;
        }
        return {
          ...group,
          options: [...group.options, newOption],
        };
      })
    );
    dispatch(newOption);
  };

  return {
    options,
    handleCreate,
  };
};
