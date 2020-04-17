import { prettyDOM } from "@testing-library/react";

const prod = {
  url: {
    API_URL: "http://howididit-exp-v2-dev.eu-west-1.elasticbeanstalk.com/",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:4000",
  },
};

const config = process.env.NODE_ENV === "development" ? dev : prod;
export default config;
