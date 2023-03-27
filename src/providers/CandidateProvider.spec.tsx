import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CandidateProvider, { CandidateContext } from "./CandidateProvider";
import { approveCandidate } from "../reducers/candidates";
import { Candidate } from "../types";

var localStorageMock = (function () {
  var store: Record<string, any> = {
    localCandidates: JSON.stringify({
      submissions: [
        {
          candidate: { name: { first: "John", last: "Doe" } },
          status: "approved",
          reason: "Reason",
        },
      ],
    }),
  };
  return {
    getItem: function (key: string) {
      return store[key];
    },
    setItem: function (key: string, value: any) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const TestComponent = () => {
  const { candidates, dispatch } = React.useContext(CandidateContext);
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

  return (
    <div>
      <button
        onClick={() => {
          dispatch(approveCandidate(candidate, "Great skills"));
        }}
      >
        Approve Candidate
      </button>
      <span>{candidates.submissions.length}</span>
    </div>
  );
};

describe("CandidateProvider", () => {
  test("initial state comes from localstorage", () => {
    render(
      <CandidateProvider>
        <TestComponent />
      </CandidateProvider>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("updates state on dispatch", () => {
    render(
      <CandidateProvider>
        <TestComponent />
      </CandidateProvider>
    );

    fireEvent.click(screen.getByText("Approve Candidate"));
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
