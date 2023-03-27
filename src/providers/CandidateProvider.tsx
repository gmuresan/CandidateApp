import React, { createContext, useEffect, useReducer } from "react";
import {
  candidatesReducer,
  initializer,
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
