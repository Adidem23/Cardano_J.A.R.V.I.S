from mcp.server.fastmcp import FastMCP
import pyautogui
import time
import pyperclip
import os
import requests


mcp = FastMCP("Cardano_J.A.R.V.I.S")

def openCardanoWallet():
         pyautogui.press("win")
         time.sleep(1)
         pyautogui.typewrite("chrome", interval=0.1)
         time.sleep(1)
         pyautogui.press("enter")
         time.sleep(1)
         pyautogui.typewrite("chrome-extension://kfdniefadaanbjodldohaedphafoffoh/tab.html#/wallet", interval=0.05)
         pyautogui.press("enter")
         time.sleep(3)


# Send Transaction Starts ----------------------------------------

ASSET_DIR = 'D:\\hp\\Dev\\Cardano_J.A.R.V.I.S\\backend\\assests'

ADDRESS_TEMPLATE = os.path.join(ASSET_DIR, "Address.png")
AMOUNT_TEMPLATE  = os.path.join(ASSET_DIR, "Amount.png")
SEND_TEMPLATE    = os.path.join(ASSET_DIR, "Send.png")
CONFIRM_TEMPLATE = os.path.join(ASSET_DIR, "Confirm.png")
PASSWORD_TEMPLATE = os.path.join(ASSET_DIR, "Password.png")


CONFIDENCE = 0.80  
RETRY_SECONDS = 12
RETRY_INTERVAL = 0.5

MOVE_DURATION = 0.18
TYPE_INTERVAL = 0.03

PASSWORD_APPEAR_TIMEOUT = 20
PASSWORD_POLL = 0.6

PASSWORD_DISAPPEAR_TIMEOUT = 60
PASSWORD_DISAPPEAR_POLL = 0.6

def ensure_asset_dir():
    if not os.path.exists(ASSET_DIR):
        os.makedirs(ASSET_DIR, exist_ok=True)


def locate_center(template_path, timeout=RETRY_SECONDS, poll=RETRY_INTERVAL, confidence=CONFIDENCE):
    start = time.time()
    while time.time() - start < timeout:
        try:
            if confidence is not None:
                box = pyautogui.locateOnScreen(template_path, confidence=confidence)
            else:
                box = pyautogui.locateOnScreen(template_path)
        except Exception:
            try:
                box = pyautogui.locateOnScreen(template_path)
            except Exception:
                box = None
        if box:
            return pyautogui.center(box)
        time.sleep(poll)
    return None

def safe_click(x, y, move_duration=MOVE_DURATION):
    sw, sh = pyautogui.size()
    x = max(2, min(sw-2, int(x)))
    y = max(2, min(sh-2, int(y)))
    pyautogui.moveTo(x, y, duration=move_duration)
    pyautogui.click()
    time.sleep(0.15)

def select_all_and_copy():
    prev = ""
    try:
        prev = pyperclip.paste()
    except Exception:
        prev = ""
    if os.name == "nt":
        pyautogui.hotkey('ctrl', 'a'); time.sleep(0.04); pyautogui.hotkey('ctrl', 'c')
    else:
        pyautogui.hotkey('command', 'a'); time.sleep(0.04); pyautogui.hotkey('command', 'c')
    time.sleep(0.08)
    try:
        got = pyperclip.paste()
    except Exception:
        got = ""
    return prev, got

def restore_clipboard(val):
    try:
        pyperclip.copy(val)
    except Exception:
        pass

def clear_field():
    if os.name == "nt":
        pyautogui.hotkey('ctrl', 'a')
    else:
        pyautogui.hotkey('command', 'a')
    time.sleep(0.03)
    pyautogui.press('backspace')
    time.sleep(0.06)

def verify_field_contains(expected, tries=2):
    for _ in range(tries):
        _, got = select_all_and_copy()
        if expected in (got or ""):
            return True
        time.sleep(0.05)
    return False

# ---- Flow steps ----
def fill_address(Address):
    print("[+] Locating Address template...")
    center = locate_center(ADDRESS_TEMPLATE)
    if not center:
        print("     Address template not found.")
        return False
    print("    Clicking Address and typing...")
    safe_click(*center)
    time.sleep(0.12)
    clear_field()
    pyautogui.typewrite(Address, interval=TYPE_INTERVAL)
    time.sleep(0.18)
    if verify_field_contains(Address):
        print("     Address verified.")
    else:
        print("     Address not verified via clipboard (continuing).")
    return True

def fill_amount_direct(Amount):
    print("[+] Locating Amount template...")
    center = locate_center(AMOUNT_TEMPLATE)
    if not center:
        print("     Amount template not found.")
        return False
    print("    Clicking Amount and typing (once)...")
    safe_click(*center)
    time.sleep(0.12)
    clear_field()
    pyautogui.typewrite(Amount, interval=TYPE_INTERVAL)
    time.sleep(0.12)
    if verify_field_contains(Amount):
        print("     Amount verified.")
    else:
        print("     Amount not verified via clipboard (but typed).")
    return True

def click_send_and_confirm():
    print("[+] Locating Send button...")
    send_center = locate_center(SEND_TEMPLATE)
    if not send_center:
        print("     Send template not found.")
        return False
    print("    Clicking Send...")
    safe_click(*send_center)
    time.sleep(0.6)

    print("[+] Waiting for Confirm button (modal)...")
    confirm_center = locate_center(CONFIRM_TEMPLATE, timeout=20, poll=0.6)
    if confirm_center:
        print("    Clicking Confirm (to open password modal)...")
        safe_click(*confirm_center)
        time.sleep(0.6)
        return True
    else:
        print("     Confirm not found; aborting.")
        return False


def clickConfirmTemp():
    print("[+] Waiting for Confirm button (modal)...")
    confirm_center = locate_center(CONFIRM_TEMPLATE, timeout=20, poll=0.6)
    if confirm_center:
        print("    Clicking Confirm (to open password modal)...")
        safe_click(*confirm_center)
        time.sleep(0.6)
        return True
    else:
        print("     Confirm not found; aborting.")
        return False

def wait_for_user_password_and_submit():
    print("[+] Waiting for password input to appear...")

    pw_center = locate_center(PASSWORD_TEMPLATE, timeout=PASSWORD_APPEAR_TIMEOUT, poll=PASSWORD_POLL)

    if not pw_center:
        print("     Password input not detected within timeout. Maybe modal didn't show.")
        return False
    print("    Password modal detected on screen. Please enter your password manually in the modal and click Confirm.")
  

    start = time.time()
    while time.time() - start < PASSWORD_DISAPPEAR_TIMEOUT:
        try:
            still = pyautogui.locateOnScreen(PASSWORD_TEMPLATE)
        except Exception:
            try:
                still = pyautogui.locateOnScreen(PASSWORD_TEMPLATE)
            except Exception:
                still = None
        if not still:
            print("    Password modal disappeared — assuming user submitted the password.")
            return True
        time.sleep(PASSWORD_DISAPPEAR_POLL)
    print("     Password modal still visible after timeout. Please verify manually.")
    return False

def SendTransactions(Address,Amount):
    ensure_asset_dir()

    openCardanoWallet()

    time.sleep(2)

    if not fill_address(Address):
        print("Address step failed — aborting.")
        return
    time.sleep(0.18)

    # fill amount
    if not fill_amount_direct(Amount):
        print("Amount step failed — aborting.")
        return
    time.sleep(0.18)

    # click send and initial confirm
    if not click_send_and_confirm():
        print("Send/Confirm step failed — aborting.")
        return

    # wait for user to enter password and submit
    ok = wait_for_user_password_and_submit()
    if not ok:
        print("Password step not completed programmatically. Please complete it manually.")
    else:
        print("Password submitted by user. Flow finished.")

     
    time.sleep(2)

    clickConfirmTemp()

# Send Transaction Ends --------------------------------


# Staking Transaction Begins --------------------------

LOCATE_TIMEOUT = 20
LOCATE_POLL = 0.5
OPEN_WAIT = 3.5

MOVE_DURATION = 0.18
CLICK_DELAY = 0.15

START_TEMPLATE       = os.path.join(ASSET_DIR, "Start.png")
SEARCH_TEMPLATE      = os.path.join(ASSET_DIR, "Search.png")   
POOL_RESULT_TEMPLATE = os.path.join(ASSET_DIR, "PoolResult.png")
SELECT_TEMPLATE      = os.path.join(ASSET_DIR, "Select.png")
PASSWORD_TEMPLATE    = os.path.join(ASSET_DIR, "Password.png")

def safe_click_at(center):
    x, y = center
    sw, sh = pyautogui.size()
    x = max(2, min(sw-2, int(x)))
    y = max(2, min(sh-2, int(y)))
    pyautogui.moveTo(x, y, duration=MOVE_DURATION)
    pyautogui.click()
    time.sleep(CLICK_DELAY)

def require_template_and_click(template_path, friendly_name, timeout=LOCATE_TIMEOUT):
    print(f"[+] Waiting for {friendly_name}...")
    center = locate_center(template_path, timeout=timeout)
    if not center:
        print(f"     {friendly_name} not found within {timeout}s.")
        return False
    print(f"     {friendly_name} found at {center} — clicking.")
    safe_click_at(center)
    return True

def wait_for_template(template_path, friendly_name, timeout=LOCATE_TIMEOUT):
    print(f"[+] Waiting for {friendly_name} to appear...")
    center = locate_center(template_path, timeout=timeout)
    if center:
        print(f"     {friendly_name} appeared at {center}.")
        return True
    print(f"     {friendly_name} did not appear within {timeout}s.")
    return False

def click_and_type_in_search(pool_name):
    center = locate_center(SEARCH_TEMPLATE, timeout=15)
    if not center:
        print("     Search input not found.")
        return False
    print(f"     Clicking search input at {center} and typing pool name...")
    safe_click_at(center)

    if os.name == "nt":
        pyautogui.hotkey('ctrl', 'a')
    else:
        pyautogui.hotkey('command', 'a')
    time.sleep(0.06)
    pyautogui.press('backspace')
    time.sleep(0.06)
    pyautogui.typewrite(pool_name, interval=0.04)
    pyautogui.press('enter')
    time.sleep(0.6)
    return True

def openStakeURL():
    pyautogui.press("win")
    time.sleep(1)
    pyautogui.typewrite("chrome", interval=0.1)
    time.sleep(1)
    pyautogui.press("enter")
    time.sleep(1)
    pyautogui.typewrite("chrome-extension://kfdniefadaanbjodldohaedphafoffoh/tab.html#/wallet/staking", interval=0.05)
    pyautogui.press("enter")
    time.sleep(3)
    

def StaketoPool(PoolName):
    if not os.path.isdir(ASSET_DIR):
        print(f"Asset directory not found: {ASSET_DIR}")
        return

    openStakeURL()

    if not require_template_and_click(START_TEMPLATE, "Start button"):
        return
    
    time.sleep(0.8)


    if not click_and_type_in_search(PoolName):
        return
    time.sleep(0.8)

    if not require_template_and_click(SELECT_TEMPLATE, "Select button"):
        return
    time.sleep(0.6)

    if not require_template_and_click(CONFIRM_TEMPLATE, "Confirm (review) button", timeout=20):
        return
    time.sleep(0.6)

    if not wait_for_template(PASSWORD_TEMPLATE, "Password input (modal)", timeout=20):
        return

    time.sleep(3)

    if not require_template_and_click(CONFIRM_TEMPLATE, "Confirm (review) button", timeout=20):
            return
    time.sleep(0.6)

# Staking Transaction Ends -----------------------------

# Fetch pools Starts -------------------

def fetchAllAvailablePools():
    resp = requests.get("https://preprod.koios.rest/api/v1/pool_list")

    registered = [p for p in resp.json() if p.get("pool_status","").lower() == "registered"]
    
    return registered[:10]
    
# Fetch pools Ends ---------------------

# Open Explorer Starts --------------

SCROLL_STEPS = 12
SCROLL_PER_STEP = -400
STEP_DELAY = 0.35


SEARCH_INPUT_TEMPLATE = os.path.join(ASSET_DIR, "Search_Explorer.png")
SEARCH_BUTTON_TEMPLATE = os.path.join(ASSET_DIR, "Search_Button.png")

def OpenExplorer():
    pyautogui.hotkey("win", "r")
    time.sleep(0.3)

    pyautogui.typewrite("chrome\n", interval=0.05)
    time.sleep(1.8)

    pyautogui.typewrite("https://preprod.cardanoscan.io", interval=0.02)
    pyautogui.press("enter")

    time.sleep(5)

def safe_click_at_explorer(x, y):
    sw, sh = pyautogui.size()
    x = max(2, min(sw - 2, x))
    y = max(2, min(sh - 2, y))

    pyautogui.moveTo(x, y, duration=MOVE_DURATION)
    pyautogui.click()
    time.sleep(CLICK_DELAY)

def SearchTransactionForAddress(wallet_address):
    
    url = "https://preprod.koios.rest/api/v1/address_txs"

    payload = {
    "_addresses": [
        f'{wallet_address}'
    ]
}

    headers = {
    "accept": "application/json",
    "content-type": "application/json"
}

    All_Trasnactions = requests.post(url, json=payload, headers=headers)
    
    OpenExplorer()

    time.sleep(0.4)
    
    input_center = locate_center(SEARCH_INPUT_TEMPLATE)
    
    safe_click_at_explorer(input_center.x, input_center.y)

    pyautogui.hotkey("ctrl", "a")
    pyautogui.press("backspace")
    time.sleep(0.1)

 
    pyautogui.typewrite(wallet_address, interval=0.015) 

    time.sleep(0.2)

    
    if os.path.exists(SEARCH_BUTTON_TEMPLATE):

        btn = locate_center(SEARCH_BUTTON_TEMPLATE, timeout=6)

        if btn:
            safe_click_at_explorer(btn.x, btn.y)
        
   
    time.sleep(2)

    input_center2 = locate_center(SEARCH_INPUT_TEMPLATE, timeout=3)

    if input_center2:
        safe_click_at_explorer(input_center2.x, input_center2.y + 200)
    else:
        sw, sh = pyautogui.size()
        safe_click_at(sw // 2, sh // 2)


    for _ in range(SCROLL_STEPS):
        pyautogui.scroll(SCROLL_PER_STEP)
        time.sleep(STEP_DELAY)
    
    response=All_Trasnactions.json()

    tx_hashes = [tx["tx_hash"] for tx in response]

    return tx_hashes

    

# Open Explorer Ends ---------


@mcp.tool()
def openUserWallet():
        openCardanoWallet()

@mcp.tool()
def sendUserTransactions(Address:str,Amount:str):
    SendTransactions(Address,Amount)

@mcp.tool()
def createStakingTransaction(poolName:str):
    StaketoPool(poolName)

@mcp.tool()
def AvailablePools():
    return fetchAllAvailablePools()

@mcp.tool()
def SearchTransactions(wallletAddr:str):
   return SearchTransactionForAddress(wallletAddr)


    

mcp.run(transport="stdio")