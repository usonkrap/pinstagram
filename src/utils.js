import { noun, adjective } from "./words";

export const generateSecret = () => {
  const randomN = Math.floor(Math.random() * noun.length);
  return `${adjective[randomN]} ${noun[randomN]}`;
};
