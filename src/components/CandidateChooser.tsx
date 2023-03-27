import { useState, useEffect } from "react";
import { Candidate } from "../types";
import CandidateCard from "./CandidateCard";
import CandidateForm from "./CandidateForm";

const CandidateChooser = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <div>
      {!isLoading && currentCandidate ? (
        <div>
          <CandidateCard candidate={currentCandidate} />
          <CandidateForm candidate={currentCandidate} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CandidateChooser;
