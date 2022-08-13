# Talk-kiosk-client

<a href="https://github.com/Fantastic5-Team/talk-kiosk-client/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/Fantastic5-Team/talk-kiosk-client"></a>
<a href="https://github.com/Fantastic5-Team/talk-kiosk-client/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/Fantastic5-Team/talk-kiosk-client"></a>
<a href="https://github.com/Fantastic5-Team/talk-kiosk-client/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/Fantastic5-Team/talk-kiosk-client?color=yellow"></a>
<a href="https://github.com/Fantastic5-Team/talk-kiosk-client"><img alt="GitHub license" src="https://img.shields.io/github/license/Fantastic5-Team/talk-kiosk-client"></a>

## 개요
말하는 사이에 주문 완료! 프로젝트의 클라이언트 리파지토리 입니다!

서버 리파지토리\
<a href="https://github.com/Fantastic5-Team/talk-kiosk-server" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-talk--kiosk--server-brightgreen?style=for-the-badge&logo=github" />
</a>\
플라스크 서버 리파지토리\
<a href="https://github.com/Fantastic5-Team/talk-kiosk-flask_server" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-talk--kiosk--flask_server-brightgreen?style=for-the-badge&logo=github" />
</a>

## url별 기능 설명
### `/` - [KioskHome](https://wjlee611.github.io/talk-kiosk-client/)
> 키오스크 메인 화면입니다.\
> 맨 처음 보게되는 화면입니다.

### `/console` - [ConsoleHome](https://wjlee611.github.io/talk-kiosk-client/console)
> 직원용 콘솛 화면입니다.\
> 주문 내역과 조리 완료된 주문을 보고 처리할 수 있습니다.\
> 실시간으로 서버와 통신하며, 주문 처리시 1초의 텀을 두고 갱신됩니다.

### `/processing` - [Processing](https://wjlee611.github.io/talk-kiosk-client/processing)
> 주문 중 발생하는 이벤트를 처리할 수 있는 페이지 입니다.\
> 화면 왼쪽에 항상 음성인식을 위한 버튼이 존재하며,\
> 아래의 4개의 탭으로 각 상황에 대응할 수 있습니다.

### `/processing/list` - [MenuList](https://wjlee611.github.io/talk-kiosk-client/processing/list)
> 사용자가 요구하는 메뉴를 화면에 뿌려주는 페이지 입니다.\
> 메인/사이드/음료 메뉴를 sticky header로 나누어 보여주기에,\
> 어느 스크롤 위치라도 메뉴의 카테고리를 쉽게 파악할 수 있습니다.

### `/processing/spec?menu=<id>` - [MenuSpec](https://wjlee611.github.io/talk-kiosk-client/processing/spec?menu=101)
> 메뉴 id에 해당하는 상세정보를 표시하는 페이지 입니다.\
> query string으로 메뉴의 아이디 값을 넘겨줘야 메뉴가 나오며,\
> 그렇지 않은 경우 아무것도 표시되지 않습니다.

### `/processing/option` - [MenuOption](https://wjlee611.github.io/talk-kiosk-client/processing/option)
> 메인 메뉴의 옵션을 선택할 수 있는 페이지 입니다.

### `/processing/set` - [MenuSet](https://wjlee611.github.io/talk-kiosk-client/processing/set)
> 메인 메뉴의 세트 옵션을 추가할 수 있는 페이지 입니다.

## 서버와 통신 방법

다음 문서를 참고하세요.

> 바로가기 | [API](https://github.com/Fantastic5-Team/talk-kiosk-server#api),
[데이터 양식](https://github.com/Fantastic5-Team/talk-kiosk-server#%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%96%91%EC%8B%9D)

## 기술 스택
**React@18.2.0 (typescript)**
```json
"dependencies": {
  "axios": "^0.27.2",
  "query-string": "^7.1.1",
  "react-hook-form": "^7.33.1",
  "react-query": "^3.39.1",
  "react-router-dom": "^5.3.0",
  "react-speech-recognition": "^3.9.1",
  "react-sticky-el": "^2.0.9",
  "recoil": "^0.7.4",
  "styled-components": "^5.3.5",
}
```
