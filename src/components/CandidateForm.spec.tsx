import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import CandidateForm from "./CandidateForm";
import CandidateProvider from "../providers/CandidateProvider";
import { Candidate } from "../types";

const candidate: Candidate = {
  name: { title: "Mr", first: "John", last: "Doe" },
  email: "john.doe@example.com",
  location: {
    city: "New York",
    state: "New York",
    country: "United States",
  },
  picture: { large: "https://via.placeholder.com/150" },
} as any as Candidate;

const onSubmit = jest.fn();

describe("CandidateForm", () => {
  test("renders textarea for reason", () => {
    render(
      <CandidateProvider>
        <CandidateForm candidate={candidate} onSubmit={onSubmit} />
      </CandidateProvider>
    );
    const textarea = screen.getByPlaceholderText(
      "Reasons for accepting or rejecting"
    );
    expect(textarea).toBeInTheDocument();
  });

  test("renders Approve and Reject buttons", () => {
    render(
      <CandidateProvider>
        <CandidateForm candidate={candidate} onSubmit={onSubmit} />
      </CandidateProvider>
    );
    expect(screen.getByText("Approve")).toBeInTheDocument();
    expect(screen.getByText("Reject")).toBeInTheDocument();
  });

  test("approves candidate on form submit", async () => {
    render(
      <CandidateProvider>
        <CandidateForm candidate={candidate} onSubmit={onSubmit} />
      </CandidateProvider>
    );
    fireEvent.change(
      screen.getByPlaceholderText("Reasons for accepting or rejecting"),
      {
        target: { value: "Great candidate" },
      }
    );

    fireEvent.click(screen.getByText("Approve"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  test("rejects candidate on Reject button click", async () => {
    render(
      <CandidateProvider>
        <CandidateForm candidate={candidate} onSubmit={onSubmit} />
      </CandidateProvider>
    );
    fireEvent.change(
      screen.getByPlaceholderText("Reasons for accepting or rejecting"),
      {
        target: { value: "Not a good fit" },
      }
    );

    fireEvent.click(screen.getByText("Reject"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
