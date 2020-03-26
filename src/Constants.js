import { prettyDOM } from "@testing-library/react";

const prod = {
  url: {
    API_URL: "Not defined yet"
  }
};

const dev = {
  url: {
    API_URL: "http://localhost:4000"
  }
};

const config = process.env.NODE_ENV === "development" ? dev : prod;
export default config;
