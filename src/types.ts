export type Candidate = {
  name: {
    first: string;
    last: string;
    title: string;
  };
  id: {
    name: string;
    value: string;
  };
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  email: string;
  dob: {
    age: number;
    date: string;
  };
  location: {
    city: string;
    country: string;
    state: string;
  };
  phone: string;
};
