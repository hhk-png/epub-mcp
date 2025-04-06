import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

export type TupleToObject<T extends any[]> =
  T extends [infer Name, infer Description, infer Schema, infer Cb]
    ? {
        name: Name
        description: Description
        inputSchema: Schema
        cb: Cb
      }
    : never

export type ToolParamsObject = TupleToObject<Parameters<McpServer['tool']>>
