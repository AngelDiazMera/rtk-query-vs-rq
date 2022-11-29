import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  petApi: {
    from: {
      source: "url",
      url: "https://petstore3.swagger.io/api/v3/openapi.json",
    },
    outputDir: "src/redux/Features/EmptyApi/OutputApi.ts",
    to: async (context) => {
      const filenamePrefix = "petApi";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
