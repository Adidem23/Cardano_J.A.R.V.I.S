from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from langchain_mcp_adapters.tools import load_mcp_tools
import asyncio

server_script_path = "./../masumi/masumi-mcp-server/server.py"
command = "python"
        
server_params = StdioServerParameters(
                command=command,
                args=[server_script_path],
                env=None
)

async def runMasumiMcp(): 
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
                            await session.initialize()
                            tools=await load_mcp_tools(session)
                            resp= await session.call_tool(name="list_agents")
                            print(tools)

asyncio.run(runMasumiMcp())
