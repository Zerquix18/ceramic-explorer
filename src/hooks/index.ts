import { useContext } from "react";
import { CeramicClientContext } from "../providers";

export const useCeramicClient = () => {
  const ceramicClientContext = useContext(CeramicClientContext);
  if (! ceramicClientContext) {
    throw new Error('Calling useCeramicClient outside provider');
  }

  return ceramicClientContext;
};
