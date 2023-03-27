import { Candidate } from "../types";

export type State = {
  all: Candidate[];
  rejected: Candidate[];
  approved: Candidate[];
};

export const initialState: State = {
  all: [],
  approved: [],
  rejected: [],
};

type ApproveAction = {
  type: "APPROVE_CANDIDATE";
  payload: Candidate;
};

type RejectAction = {
  type: "REJECT_CANDIDATE";
  payload: Candidate;
};

type UndoAction = {
  type: "UNDO_CANDIDATE";
};

export type Action = ApproveAction | RejectAction | UndoAction;

export const initializer = (): State => {
  return initialState;
  //JSON.parse(localStorage.getItem("localCandidates")) || initialValue;
};

export const candidatesReducer = (state: State, action: Action) => {
  switch (action.type) {
  }
  return state;
};

export const approveCandidate = (candidate: Candidate): ApproveAction => {
  return {
    type: "APPROVE_CANDIDATE",
    payload: candidate,
  };
};

export const rejectCandidate = (candidate: Candidate): RejectAction => {
  return {
    type: "REJECT_CANDIDATE",
    payload: candidate,
  };
};

export const undoCandidate = (): UndoAction => {
  return {
    type: "UNDO_CANDIDATE",
  };
};
