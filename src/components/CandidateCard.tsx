import "./CandidateCard.css";
import { Candidate } from "../types";

const CandidateCard = ({
  candidate,
}: {
  candidate: Candidate;
}): React.ReactElement => {
  const { name, picture, location, email } = candidate;
  return (
    <div className="card">
      <img src={picture.large} alt="Candidate" />
      <div className="info-line">
        <div>Name:</div>
        <div>
          {" "}
          {name.title} {name.first} {name.last}
        </div>
      </div>

      <div className="info-line">
        <div>Email:</div>
        <div>{email}</div>
      </div>
      <div className="info-line">
        <div>Location:</div>
        <div>
          {location.city}, {location.state}, {location.country}
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
