# 이 파일에 게임 스크립트를 입력합니다.

# image 문을 사용해 이미지를 정의합니다.
# image eileen happy = "eileen_happy.png"

# 게임에서 사용할 캐릭터를 정의합니다.
define t = Character('티아', color="#c8ffc8")

init python:
    import requests


# 여기에서부터 게임이 시작합니다.
label start:


    show text "Please wait..."

    pause 0

    while 1:
        python:
            try:
                response = requests.get("http://localhost:3000/api/chat?botId=Tia&message=Hello")
            except:
                response = None

        hide text

        t "[response.text]"        


    return
