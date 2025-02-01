import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/graphql", // Replace with your GraphQL endpoint
  documents: ["app/**/*.{ts,tsx}", "utils/**/*.{ts,tsx}"], // Adjust paths based on your project structure
  generates: {
    "./utils/gql/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;
