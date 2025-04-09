本项目是一个epub文件相关的mcp，提供了读取epub文件内容的 mcp tool：

### Usage

cline的mcpServers配置

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

在windows环境下，可以使用如下这种配置：

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

但最稳妥的配置是直接使用node执行对应文件，如下：

```json
{
  "mcpServers": {
    "epub-mcp": {
      "command": "node",
      "args": [
        "<安装目录>\\node_modules\\epub-mcp\\dist\\index.mjs" // epub-mcp的安装位置路径
      ]
    }
  }
}
```

### Tools:

#### **reset or init epub（initEpubFile）**

**参数：**

- `filePath`: 文件在文件系统中的绝对路径

**返回值**：

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

**参数：**

- none

以上各tool的详细解释可以查看：[https://github.com/hhk-png/lingo-reader/blob/main/packages/epub-parser/README-zh.md](https://github.com/hhk-png/lingo-reader/blob/main/packages/epub-parser/README-zh.md)，本mcp只是简单的调用了一下 `@lingo-reader/epub-parser` 的api。
