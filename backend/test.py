import os
import time
import pyautogui

# ----------------------------------
# CONFIG
# ----------------------------------

URL = "https://preprod.cardanoscan.io/"

WALLET_ADDRESS = "addr_test1qpaxvpc0g5amvvytc7vdgehxn44q4kafjctwdphrr0fka88963cw9vhvsa4sa3s2m4je37qalq3r22l5rqpyreukdw9qf7j9hd"

ASSET_DIR = "./assests"
SEARCH_INPUT_TEMPLATE = os.path.join(ASSET_DIR, "Search_Explorer.png")
SEARCH_BUTTON_TEMPLATE = os.path.join(ASSET_DIR, "Search_Button.png")

CONFIDENCE = 0.80
LOCATE_TIMEOUT = 15
LOCATE_POLL = 0.4

SCROLL_STEPS = 12
SCROLL_PER_STEP = -400
STEP_DELAY = 0.35

MOVE_DURATION = 0.18
CLICK_DELAY = 0.12

pyautogui.FAILSAFE = True  # Move mouse to top-left to abort


# ----------------------------------
# FUNCTIONS
# ----------------------------------

def open_site_with_pyautogui(url):
    """Open Chrome using WIN+R then load the URL."""
    ("[*] Opening Chrome manually...")
    pyautogui.hotkey("win", "r")
    time.sleep(0.3)

    pyautogui.typewrite("chrome\n", interval=0.05)
    time.sleep(1.8)

    pyautogui.typewrite(url, interval=0.02)
    pyautogui.press("enter")

    ("[*] Waiting for site to load...")
    time.sleep(5)


def locate_center(template_path, timeout=LOCATE_TIMEOUT, confidence=CONFIDENCE):
    """Return center(x,y) of template, else None."""
    start = time.time()

    while time.time() - start < timeout:
        try:
            box = pyautogui.locateOnScreen(template_path, confidence=confidence)
        except:
            box = pyautogui.locateOnScreen(template_path)

        if box:
            return pyautogui.center(box)

        time.sleep(LOCATE_POLL)

    return None


def safe_click_at(x, y):
    sw, sh = pyautogui.size()
    x = max(2, min(sw - 2, x))
    y = max(2, min(sh - 2, y))

    pyautogui.moveTo(x, y, duration=MOVE_DURATION)
    pyautogui.click()
    time.sleep(CLICK_DELAY)


def search_address(wallet_address):
    
    input_center = locate_center(SEARCH_INPUT_TEMPLATE)
    
    safe_click_at(input_center.x, input_center.y)

    # Clear existing text
    pyautogui.hotkey("ctrl", "a")
    pyautogui.press("backspace")
    time.sleep(0.1)

 
    pyautogui.typewrite(wallet_address, interval=0.015) 

    time.sleep(0.2)

    
    if os.path.exists(SEARCH_BUTTON_TEMPLATE):

        btn = locate_center(SEARCH_BUTTON_TEMPLATE, timeout=6)

        if btn:
            safe_click_at(btn.x, btn.y)
        
   
    time.sleep(2)

    # Move mouse into results area for scrolling
    input_center2 = locate_center(SEARCH_INPUT_TEMPLATE, timeout=3)

    if input_center2:
        safe_click_at(input_center2.x, input_center2.y + 200)
    else:
        sw, sh = pyautogui.size()
        safe_click_at(sw // 2, sh // 2)


    for _ in range(SCROLL_STEPS):
        pyautogui.scroll(SCROLL_PER_STEP)
        time.sleep(STEP_DELAY)

    
    return True


# ----------------------------------
# MAIN
# ----------------------------------

if __name__ == "__main__":
        open_site_with_pyautogui(URL)

        ok = search_address(WALLET_ADDRESS)

