import {
  candidatesReducer,
  approveCandidate,
  rejectCandidate,
  undoSubmission,
  initialState,
  CandidateStatus,
} from "./candidates";
import { Candidate } from "../types";

describe("candidatesReducer", () => {
  const candidate = { id: "2", name: "John Doe" } as any as Candidate;

  test("APPROVE_CANDIDATE action", () => {
    const action = approveCandidate(candidate, "Great skills");
    const state = candidatesReducer(initialState, action);

    expect(state.submissions.length).toBe(1);
    expect(state.submissions[0].candidate).toEqual(candidate);
    expect(state.submissions[0].status).toEqual(CandidateStatus.Approved);
    expect(state.submissions[0].reason).toEqual("Great skills");
  });

  test("REJECT_CANDIDATE action", () => {
    const action = rejectCandidate(candidate, "Lack of experience");
    const state = candidatesReducer(initialState, action);

    expect(state.submissions.length).toBe(1);
    expect(state.submissions[0].candidate).toEqual(candidate);
    expect(state.submissions[0].status).toEqual(CandidateStatus.Rejected);
    expect(state.submissions[0].reason).toEqual("Lack of experience");
  });

  test("UNDO_SUBMISSION action", () => {
    const submission = {
      status: 0,
      reason: "reason",
      candidate: {} as any as Candidate,
    };
    const action = undoSubmission(submission);
    const state = candidatesReducer(
      {
        submissions: [submission],
      },
      action
    );
    expect(state.submissions.length).toBe(0);
  });
});
