# Excel Memory MCP Server Setup

## Overview

This setup automatically saves Claude's memories to an Excel file with timestamps. No more prompting—memories are saved automatically!

## Files

1. **memory_server.py** - MCP server that provides three tools:
   - `add_memory()` - Saves prompt, response, and memory to Excel
   - `get_recent_memory()` - Retrieves last N memory entries
   - `search_memory()` - Searches memories by keyword

2. **.mcp.json** - Registers the MCP server with Claude Code

3. **memory.xlsx** - Auto-generated Excel file that stores all memories

## How It Works

### 1. MCP Server Registration
The `.mcp.json` file tells Claude Code about your MCP server:

```json
{
  "mcpServers": {
    "excel-memory": {
      "command": "python",
      "args": ["path/to/memory_server.py"]
    }
  }
}
```

### 2. Auto-Memory Enabled
Settings in `~/.claude/settings.json` enable automatic memory saving:

```json
{
  "autoMemoryEnabled": true,
  "autoMemoryDirectory": "your-memory-path"
}
```

### 3. Automatic Saving
With auto-memory enabled, Claude now:
- ✅ Automatically saves memories with timestamps
- ✅ No prompts asking "do you want to save?"
- ✅ All memories stored in Excel format
- ✅ Each row has: date, prompt, response, memory

## Excel File Format

The `memory.xlsx` file has this structure:

| date | prompt | claude_response | memory_written |
|------|--------|-----------------|-----------------|
| 2026-04-12 14:30:45 | How do I...? | Here's how... | Learned about... |
| 2026-04-12 15:12:30 | What is...? | It is... | Stored concept X |

## Usage

### Option 1: Let Claude Use It Automatically
Once enabled, just chat naturally! Claude will:
1. Automatically call `add_memory` when saving memories
2. Store everything in Excel with current timestamp
3. No manual intervention needed

### Option 2: Call Tools Manually
Claude can also explicitly call the tools:

```python
# Claude uses this tool to save memories
add_memory(
  prompt="User's question",
  claude_response="My answer", 
  memory_written="What I learned"
)

# Retrieve recent memories
get_recent_memory(limit=5)

# Search memories
search_memory(keyword="python", limit=10)
```

## Testing

Run the test script:

```bash
python test_mcp_server.py
```

This will:
- Start the MCP server
- Call add_memory with test data
- Retrieve recent memories
- Show the Excel file was created/updated

## Timestamp Format

All timestamps use this format: `YYYY-MM-DD HH:MM:SS`

Example: `2026-04-12 14:30:45`

## Benefits

✨ **Automatic** - No prompts every time
⏰ **Timestamped** - Know exactly when memories were saved
📊 **Excel Format** - Easy to analyze and backup
🔍 **Searchable** - Find memories by keyword
📈 **Scalable** - Handles unlimited memories

## Next Steps

1. The MCP server is configured and ready
2. Auto-memory is enabled in Claude Code
3. Start chatting - memories save automatically!
4. Check `memory.xlsx` to see your memories stored

Questions? Check the memory_server.py source code for more details.
