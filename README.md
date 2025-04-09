<a href="./README-zh.md">中文文档链接</a>

This project is an MCP related to EPUB files, providing an MCP tool for reading EPUB file contents.

### Usage

the mcpServers configuration of [cline](https://cline.bot/):

```json
{
  "mcpServers": {
    "epub-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "epub-mcp"
      ]
    }
  }
}
```

In windows env, we can use the following configuration:

```json
{
  "mcpServers": {
    "epub-mcp": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "epub-mcp"
      ]
    }
  }
}
```

But the most reliable configuration is to use node to execute the corresponding file directly:

```json
{
  "mcpServers": {
    "epub-mcp": {
      "command": "node",
      "args": [
        // the install path of `epub-mcp`
        "<Installation Directory>\\node_modules\\epub-mcp\\dist\\index.mjs"
      ]
    }
  }
}
```

### Tools

#### **reset or init epub（initEpubFile）**

**Parameters：**

- `filePath`:  The absolute path of the file in the file system.

**Returns**：

- void

#### **get collection-（getCollection）**

#### **get file info-（getFileInfo）**

#### **get manifest-（getManifest）**

#### **get metadata-（getMetadata）**

#### **get nav list-（getNavList）**

#### **get page list-（getPageList）**

#### **get spine-（getSpine）**

#### **get table of contents-（getToc）**

#### **load chapter-（loadChapter）**

**Parameters：**

- none

For detailed explanation of the above tools, please refer to: [https://github.com/hhk-png/lingo-reader/blob/main/packages/epub-parser/README-zh.md](https://github.com/hhk-png/lingo-reader/blob/main/packages/epub-parser/README-zh.md). This MCP simply calls the api of `@lingo-reader/epub-parser`.
