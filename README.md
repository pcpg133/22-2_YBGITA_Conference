# 22-2_YBIGTA_Conference

실행 방법
1. 프로젝트 다운로드(git clone 이용)
+ Mysql과 workbench 깔고, mysql 실행

   -> 터미널에서 

   mysql.server start
      
   mysql -u root -p 
   
   입력 후 비밀번호 입력해서 mysql 실행
+ workbench 켜서 Local instance 접속
+ SCHEMAS 탭 내 영역을 오른쪽 클릭하여 Create Schema...를 선택하고, Schema name을 lunch로 설정하여 schema 생성
+ lunch 스키마를 펼친 후 Tables을 오른쪽 클릭하여 create Table...을 선택해 Table 생성 창으로 넘어감
+ Column은 [id, username, password, nickname, emptyTime, startpoint]로 6개를 만든다
+ 각 Column의 Datatype은 id -> INT, username -> VARCHAR(45), password와 nickname -> VARCHAR(128), emptyTime -> INT, startpoint -> VARCHAR(128)로 설정
+ PK/NN/UQ/AI에 체크, username은 NN/UQ에 체크, password, nickname은 NN에 체크, 나머지 emptyTime과 startpoint는 아무것도 체크하지 않고, Apply를 눌러서 테이블 생성
+ server 폴더에 .env 파일 만들고, 아래 내용 복사 

      HOST_PORT=8080
      DB_HOST=localhost
      DB_USER=root
      DB_DATABASE=lunch
      DB_PASSWORD=
      DB_PORT=
--> 여기서 DB_PASSWORD는 자신의 Mysql 비밀번호로(ex. 123456), DB_PORT는 위에 workbench의 lunch 테이블이 있는 Local instance의 포트 번호(ex. 3306)로 설정해준다

+ 앱을 끌 때 mysql.server stop을 통해 mysql도 꺼주자

2. 터미널 1 => /server로 가서 

npm install --save --legacy-peer-deps

npm start

3. 터미널 2 => /model로 가서

pip install flask

pip install pandas

pip install tqdm

pip install openpyxl

pip install haversine

pip install scikit-learn

pip install selenium

pip install opencv-python

pip install matplotlib

python app.py

4. 터미널 3 => /PLZ로 가서

npm install --save --legacy-peer-deps

npm install @react-navigation/native --save --legacy-peer-deps

npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view --save --legacy-peer-deps

cd ios

pod install

pod update

cd ..

npm start


5. 터미널 4 => /lunch/PLZ로 가서

npx react-native run-ios



** npm install --save --legacy-peer-deps 후에 package.json 등에 변화가 생긴다면, vscode에서 탐색기 아래에 있는 소스 제어 탭에 가서 다 원래대로 돌려주면 된다. 라이브러리 버전이 자동으로 업데이트되어 package.json 등에 변화가 생긴 것이므로, 원래대로 돌려도 큰 문제 없다.

** react-native에서 watchman error가 뜰 경우

watchman watch-del-all

watchman shutdown-server 실행
