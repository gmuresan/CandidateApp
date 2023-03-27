import React from "react";
import { render, screen, within } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders CandidateChooser component", () => {
    render(<App />);

    expect(screen.getByText("Find New Candidates")).toBeInTheDocument();
  });
});
