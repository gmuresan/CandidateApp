import "./CandidateChooser.css";
import { useState, useEffect } from "react";
import { Candidate } from "../types";
import CandidateCard from "./CandidateCard";
import CandidateForm from "./CandidateForm";
import CandidatesList from "./CandidatesList";

enum Page {
  FindNew,
  Review,
}

const CandidateChooser = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.FindNew);

  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  );

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const fetchNextCandidate = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setCurrentCandidate(data.results[0]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onCandidateSubmitted = (): void => {
    setCurrentCandidate(null);
    fetchNextCandidate();
  };

  return (
    <div className="page">
      <div className="tabs">
        <button onClick={() => setCurrentPage(Page.FindNew)} type="button">
          Find New Candidates
        </button>
        <button onClick={() => setCurrentPage(Page.Review)} type="button">
          Review Submissions
        </button>
      </div>
      {currentPage === Page.FindNew ? (
        <>
          {!isLoading && currentCandidate ? (
            <div className="cardPage">
              <CandidateCard candidate={currentCandidate} />
              <CandidateForm
                candidate={currentCandidate}
                onSubmit={onCandidateSubmitted}
              />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </>
      ) : (
        <CandidatesList />
      )}
    </div>
  );
};

export default CandidateChooser;
