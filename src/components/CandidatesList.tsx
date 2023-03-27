import { useContext } from "react";
import { CandidateContext } from "../providers/CandidateProvider";
import { CandidateSubmission, undoSubmission } from "../reducers/candidates";
import "./CandidatesList.css";

const CandidatesList = (): React.ReactElement => {
  const { dispatch, candidates } = useContext(CandidateContext);

  return (
    <>
      {candidates.submissions.map((submission: CandidateSubmission) => (
        <div className="submission">
          <div>
            {submission.candidate.name.first} {submission.candidate.name.last}
          </div>
          {submission.reason && (
            <div>
              <span>Reason: </span>
              {submission.reason}
            </div>
          )}
          <button onClick={() => dispatch(undoSubmission(submission))}>
            Undo
          </button>
        </div>
      ))}
    </>
  );
};

export default CandidatesList;
