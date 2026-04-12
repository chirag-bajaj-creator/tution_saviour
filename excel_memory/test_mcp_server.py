#!/usr/bin/env python3
"""
Test script to demonstrate Excel Memory MCP Server functionality
"""
import subprocess
import json
import sys
from pathlib import Path

# Test the MCP server
def test_mcp_server():
    print("🧪 Testing Excel Memory MCP Server\n")

    # Start the MCP server
    print("Starting MCP server...")
    process = subprocess.Popen(
        [sys.executable, "memory_server.py"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    # Test 1: Call add_memory tool
    print("\n1️⃣ Testing add_memory tool:")
    request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
            "name": "add_memory",
            "arguments": {
                "prompt": "How to use Excel with Python?",
                "claude_response": "You can use openpyxl library to work with Excel files",
                "memory_written": "Claude taught about Python Excel integration"
            }
        }
    }

    process.stdin.write(json.dumps(request) + "\n")
    process.stdin.flush()

    # Test 2: Call get_recent_memory tool
    print("\n2️⃣ Testing get_recent_memory tool:")
    request = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/call",
        "params": {
            "name": "get_recent_memory",
            "arguments": {
                "limit": 5
            }
        }
    }

    process.stdin.write(json.dumps(request) + "\n")
    process.stdin.flush()

    # Read responses
    try:
        for _ in range(2):
            response = process.stdout.readline()
            if response:
                print(f"Response: {response.strip()}")
    except:
        pass

    # Stop the server
    process.terminate()
    print("\n✅ Test completed!")
    print("\n📊 Check memory.xlsx file to see saved memories with timestamps")

if __name__ == "__main__":
    test_mcp_server()
