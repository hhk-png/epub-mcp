<center><h2><a href="./README-zh.md">中文文档</a></h2><center>

This project is an MCP related to EPUB files, providing an MCP tool for reading EPUB file contents.

**reset or init epub（initEpubFile）**

**Parameters：**

- `filePath`:  The absolute path of the file in the file system.

**Returns**：

- void

**get collection-（getCollection）**

**get file info-（getFileInfo）**

**get manifest-（getManifest）**

**get metadata-（getMetadata）**

**get nav list-（getNavList）**

**get page list-（getPageList）**

**get spine-（getSpine）**

**get table of contents-（getToc）**

**load chapter-（loadChapter）**

**Parameters：**

- none

For detailed explanation of the above tools, please refer to: [https://github.com/hhk-png/lingo-reader/blob/main/packages/epub-parser/README-zh.md](https://github.com/hhk-png/lingo-reader/blob/main/packages/epub-parser/README-zh.md). This MCP simply calls the api of `@lingo-reader/epub-parser`.
