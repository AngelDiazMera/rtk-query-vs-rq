import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://petstore3.swagger.io/api/v3/openapi.json',
  apiFile: './src/redux/Features/EmptyApi/EmptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/redux/Features/EmptyApi/OutputApi.ts',
  exportName: 'petApi',
  hooks: true,
}

export default config