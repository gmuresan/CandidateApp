import { Candidate } from "../types";

export enum CandidateStatus {
  Approved,
  Rejected,
}

export type CandidateSubmission = {
  candidate: Candidate;
  status: CandidateStatus;
  reason: string | undefined;
};

export type State = {
  submissions: CandidateSubmission[];
};

export const initialState: State = {
  submissions: [],
};

type ApproveAction = {
  type: "APPROVE_CANDIDATE";
  candidate: Candidate;
  reason: string | undefined;
};

type RejectAction = {
  type: "REJECT_CANDIDATE";
  candidate: Candidate;
  reason: string | undefined;
};

type UndoAction = {
  type: "UNDO_SUBMISSION";
  submission: CandidateSubmission;
};

export type Action = ApproveAction | RejectAction | UndoAction;

export const candidatesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "APPROVE_CANDIDATE":
      return {
        submissions: [
          ...state.submissions,
          {
            candidate: action.candidate,
            status: CandidateStatus.Approved,
            reason: action.reason,
          },
        ],
      };

    case "REJECT_CANDIDATE":
      return {
        submissions: [
          ...state.submissions,
          {
            candidate: action.candidate,
            status: CandidateStatus.Rejected,
            reason: action.reason,
          },
        ],
      };

    case "UNDO_SUBMISSION":
      return {
        submissions: state.submissions.filter(
          (submission) => submission !== action.submission
        ),
      };
    default:
      return state;
  }
};

export const approveCandidate = (
  candidate: Candidate,
  reason: string | undefined
): ApproveAction => {
  return {
    type: "APPROVE_CANDIDATE",
    candidate: candidate,
    reason,
  };
};

export const rejectCandidate = (
  candidate: Candidate,
  reason: string | undefined
): RejectAction => {
  return {
    type: "REJECT_CANDIDATE",
    candidate: candidate,
    reason,
  };
};

export const undoSubmission = (submission: CandidateSubmission): UndoAction => {
  return {
    type: "UNDO_SUBMISSION",
    submission,
  };
};
