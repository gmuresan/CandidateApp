import { useContext } from "react";
import { CandidateContext } from "../providers/CandidateProvider";
import { CandidateSubmission, undoSubmission } from "../reducers/candidates";

const CandidatesList = (): React.ReactElement => {
  const { dispatch, candidates } = useContext(CandidateContext);

  return (
    <div>
      {candidates.submissions.map((submission: CandidateSubmission) => (
        <div>
          <button onClick={() => dispatch(undoSubmission(submission))}>
            Undo
          </button>
          Reason: {submission.reason}
        </div>
      ))}
    </div>
  );
};

export default CandidatesList;
