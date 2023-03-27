import { Candidate } from "../types";

const CandidateCard = ({
  candidate,
}: {
  candidate: Candidate;
}): React.ReactElement => {
  const { name, picture, location, email } = candidate;
  return (
    <div>
      <div>
        {name.title}
        {name.first} {name.last}
      </div>
      <div>{email}</div>
      <div>
        {location.city}, {location.state}, {location.country}
      </div>
      <img src={picture.large} alt="Candidate" />
    </div>
  );
};

export default CandidateCard;
