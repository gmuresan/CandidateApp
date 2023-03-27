import "./CandidateForm.css";
import { useContext, useState } from "react";
import { CandidateContext } from "../providers/CandidateProvider";
import { approveCandidate, rejectCandidate } from "../reducers/candidates";
import { Candidate } from "../types";

const CandidateForm = ({
  candidate,
  onSubmit,
}: {
  candidate: Candidate;
  onSubmit: () => void;
}): React.ReactElement => {
  const { dispatch } = useContext(CandidateContext);
  const [reason, setReason] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(approveCandidate(candidate, reason));
    onSubmit();
  };

  const handleRejectClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(rejectCandidate(candidate, reason));
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="buttons">
        <button onClick={handleRejectClick} type="button" className="reject">
          Reject
        </button>
        <button type="submit" className="approve">
          Approve
        </button>
      </div>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reasons for accepting or rejecting"
      ></textarea>
    </form>
  );
};

export default CandidateForm;
