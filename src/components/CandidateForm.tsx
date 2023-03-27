import { useContext } from "react";
import { CandidateContext } from "../providers/CandidateProvider";
import { approveCandidate, rejectCandidate } from "../reducers/candidates";
import { Candidate } from "../types";

const CandidateForm = ({
  candidate,
}: {
  candidate: Candidate;
}): React.ReactElement => {
  const { dispatch } = useContext(CandidateContext);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(approveCandidate(candidate));
  };

  const handleRejectClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(rejectCandidate(candidate));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <button onClick={handleRejectClick} type="button">
        Reject
      </button>
      <button type="submit">Approve</button>
      <textarea placeholder="Reasons for accepting or rejecting"></textarea>
    </form>
  );
};

export default CandidateForm;
