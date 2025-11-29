from mcp.server.fastmcp import FastMCP
import pyautogui
import time


mcp = FastMCP("Cardano_J.A.R.V.I.S")

def openChromeFunction():
         pyautogui.press("win")
         time.sleep(1)
         pyautogui.typewrite("chrome", interval=0.1)
         time.sleep(1)
         pyautogui.press("enter")
         time.sleep(3)

@mcp.tool()
def openUsersChrome():
        openChromeFunction()

mcp.run(transport="stdio")