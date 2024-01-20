import { useState } from "react";

type Toggle = () => void;

export function useToggle(initValue: boolean): [boolean, Toggle] {
  const [toggle, setToggle] = useState<boolean>(initValue);

  return [
    toggle,
    () => {
      setToggle(!toggle);
    },
  ];
}
