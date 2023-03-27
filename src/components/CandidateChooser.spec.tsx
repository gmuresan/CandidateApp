import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import CandidateChooser from "./CandidateChooser";
import { Candidate } from "../types";
import CandidateCard from "./CandidateCard";
import CandidateForm from "./CandidateForm";
import CandidatesList from "./CandidatesList";

// Mock the child components
jest.mock("./CandidateCard", () => () => <div data-testid="candidate-card" />);
jest.mock("./CandidateForm", () => () => <div data-testid="candidate-form" />);
jest.mock("./CandidatesList", () => () => (
  <div data-testid="candidates-list" />
));

// Mock the API response
const mockCandidate: Candidate = {
  name: { title: "Mr", first: "John", last: "Doe" },
  email: "john.doe@example.com",
  picture: { large: "", medium: "", thumbnail: "" },
} as any as Candidate;

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({ results: [mockCandidate] }),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders CandidateChooser with initial state", async () => {
  render(<CandidateChooser />);
  expect(screen.getByText("Find New Candidates")).toBeInTheDocument();
  expect(screen.getByText("Review Submissions")).toBeInTheDocument();
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
  expect(screen.getByTestId("candidate-card")).toBeInTheDocument();
  expect(screen.getByTestId("candidate-form")).toBeInTheDocument();
});

test("switches between tabs", async () => {
  render(<CandidateChooser />);
  const reviewButton = screen.getByText("Review Submissions");

  fireEvent.click(reviewButton);

  expect(screen.getByTestId("candidates-list")).toBeInTheDocument();
  expect(screen.queryByTestId("candidate-card")).toBeNull();
  expect(screen.queryByTestId("candidate-form")).toBeNull();

  const findNewButton = screen.getByText("Find New Candidates");
  fireEvent.click(findNewButton);

  await waitFor(() => expect(screen.queryByText("Loading...")).toBeNull());
  expect(screen.getByTestId("candidate-card")).toBeInTheDocument();
});
