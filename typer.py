import pyautogui, time

counter = 10
name = "Aaroh"
#phrases = ['Hello {}\n'.format(name), 'Hey {} I like ham\n'.format(name), 'I do not like spam, {}\n'.format(name), 'Spam musabi is nice though, {}\n'.format(name), 'Would you like some {}?\n'.format(name)]

phrases = ['Hey what are we doing today?', 'Aaroh do you want to grab boba?', 'Let\'s go get some food Patrick', 'John did you do the homework', 'Richel want to get some wine?', 'How is everyone\'s day?', 'Did any do #4 on the homework?', 'I saw the most amazing thing today everyone', 'Terry where are you?!?!?!?!?!']
time.sleep(2)
i = 0
while True:
    pyautogui.typewrite(phrases[i])
    pyautogui.typewrite('\n')
    i += 1
    if i == 9:
        i = 0

