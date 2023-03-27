import React from "react";
import { render, screen } from "@testing-library/react";
import CandidateCard from "./CandidateCard";
import { Candidate } from "../types";

describe("CandidateCard", () => {
  const candidate: Candidate = {
    name: { title: "Mr", first: "John", last: "Doe" },
    email: "john.doe@example.com",
    location: {
      city: "New York",
      state: "New York",
      country: "United States",
    },
    picture: { large: "https://via.placeholder.com/150" },
  };

  test("renders candidate image", () => {
    render(<CandidateCard candidate={candidate} />);
    const candidateImage = screen.getByAltText("Candidate");
    expect(candidateImage).toBeInTheDocument();
    expect(candidateImage).toHaveAttribute("src", candidate.picture.large);
  });

  test("renders candidate name", () => {
    render(<CandidateCard candidate={candidate} />);
    expect(
      screen.getByText("Mr John Doe", { exact: false })
    ).toBeInTheDocument();
  });

  test("renders candidate email", () => {
    render(<CandidateCard candidate={candidate} />);
    expect(
      screen.getByText(candidate.email, { exact: false })
    ).toBeInTheDocument();
  });

  test("renders candidate location", () => {
    render(<CandidateCard candidate={candidate} />);
    expect(
      screen.getByText("New York, New York, United States", { exact: false })
    ).toBeInTheDocument();
  });
});
