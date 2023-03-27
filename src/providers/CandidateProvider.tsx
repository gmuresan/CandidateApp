import React, { createContext, useEffect, useReducer } from "react";
import {
  candidatesReducer,
  initialState,
  State,
  Action,
} from "../reducers/candidates";

type Context = {
  candidates: State;
  dispatch: React.Dispatch<Action>;
};

export const CandidateContext = createContext<Context>({
  candidates: initialState,
  dispatch: (() => {}) as React.Dispatch<Action>,
});

export const initializer = (): State => {
  const json: string =
    localStorage.getItem("localCandidates") || JSON.stringify(initialState);
  const parsed: State = JSON.parse(json) as State;
  return parsed;
};

const CandidateProvider = ({ children }: { children: JSX.Element }) => {
  const [candidates, dispatch] = useReducer(
    candidatesReducer,
    initialState,
    initializer
  );

  useEffect(() => {
    localStorage.setItem("localCandidates", JSON.stringify(candidates));
  }, [candidates]);

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        dispatch,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
};

export default CandidateProvider;
