import { CodegenConfig } from "@graphql-codegen/cli";
import Constants from "expo-constants";

const config: CodegenConfig = {
  schema: `${Constants.expoConfig.extra.apiUrl}/graphql`, // Replace with your GraphQL endpoint
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
