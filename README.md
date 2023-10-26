# 웹관제 레포스토리지

---

## 시작

```bash
yarn dlx @yarnpkg/sdks vscode
yarn install
```

---

## 골프장 추가

1. ./app 폴더 내의 프로젝트 복제
2. 복제한 프로젝트 package.json name 변경
   ex) name: @app/dogocc
   package.json의 name은 yarn workspace의 이름이다.
3. public폴더 내 코스이미지 변경
4. index.html title 변경
5. .env VITE_LOGIN_TITLE 변경

---

## 빌드 및 배포

- 전체업장 빌드 : yarn build
  - 업장 추가시 package.json -> scripts -> build에 workspace 추가
- 개별 빌드 : yarn workspace @app/dogocc(package.json -> name) build
- ./build내 빌드한 업장명으로된 폴더내의 dist폴더를 해당 골프장 서버에서 mobile-gps-server 레포스토리지에 client 폴더에 넣는다.
