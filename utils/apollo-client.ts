import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzljNDQ4ZTQ3MWQ0ZDgwY2E2YTc4MWEiLCJuYW1lIjoiTWF0dGhldyBHb3VsZCIsImVtYWlsIjoibWF0dGhld0Bnb3VsZC5jb20iLCJ0ZWFtSWQiOiI2NzljNDQ4ZDQ3MWQ0ZDgwY2E2YTc4MTUiLCJjcmVhdGVkQXQiOiIyMDI1LTAxLTMxVDAzOjMzOjM0LjAyOFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAxLTMxVDAzOjMzOjM0LjAyOFoiLCJfX3YiOjAsImlkIjoiNjc5YzQ0OGU0NzFkNGQ4MGNhNmE3ODFhIiwiaWF0IjoxNzM4MzE1MzQ1LCJleHAiOjE3MzgzMTg5NDV9.-hmO_UR9K4L3AF9x-_LWKR8zvMP7mgpb3Yh6_3mzhHU`,
  },
});

export default client;
