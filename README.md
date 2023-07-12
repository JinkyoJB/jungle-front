# Phodo  📷🗂️
## 이미지 공유 협업 툴 
![스크린샷 2023-07-12 오후 8 57 43](https://github.com/hodeethelion/phodo-front/assets/119830726/129e3048-864b-4c60-8b4e-e0168726ef59)

## 목차 
1. 프로젝트 개요 및 세부 사항
2. 서비스 소개
3. Frontend에서의 구현한 점
5. 기술적 챌린지 및 서비스 구조도
6. 프로젝트 포스터
---

## 프로젝트 개요 
프로젝트 기간 : 2023.06.12 ~ 2023.07.08
<br>
기술 스택: 
| 분류                      | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**              | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/react--query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/zustand-EC6550?style=for-the-badge&logo=zustand&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> |
| **Backend**               | 	<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">                                                                                                                                                                                                 |
| **Database**              | 	<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">                                                                                                                 |
| **Infrastructure/DevOps** | 	<img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/aws_ec2-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">           |



## 프로젝트 세부사항
팀원 : [이호준(FE)](https://github.com/hodeethelion), [정진교(FE)](https://github.com/JinkyoJB), [권도희(FE/BE)](https://github.com/shiwy15), [박영서(BE)](https://github.com/yeongseoPark), [김현태(BE)](https://github.com/HyeonTee)

### 주제 선정 배경
1. 프로젝트를 이행할 때 팀원 개개인들에게 자료들이 나뉘어 흩어져 있음
2. 이미지 분류를 직접하기 번거롭고 시간이 걸림
3. 이미지 작업물을 공유하고 의사소통을 동시에 할 수 있는 공간이 필요함
4. 회의 내용을 정리해줄 필요성이 있음

### 주요 기능 
1. 이미지 자동 카테고리 및 분류
![스크린샷 2023-07-12 오후 9 13 55](https://github.com/hodeethelion/phodo-front/assets/119830726/c6916fa6-fe59-4583-aaf2-b26a7dbc05c2)

![스크린샷 2023-07-12 오후 9 14 34](https://github.com/hodeethelion/phodo-front/assets/119830726/6f1f211d-ee82-459a-b9b3-b319a5a97be4)

자동으로 카테고리가 분류된 사진을 관리할 수 있습니다.

3. 음성 통화와 실시간 동시작업
![스크린샷 2023-07-12 오후 9 16 55](https://github.com/hodeethelion/phodo-front/assets/119830726/2ab0d93e-da5f-4dc0-91e7-a2f050116090)

실시간으로 음성통화를 하며 사진을 프로젝트 팀원들과 공유할 수 있습니다.

4. AI를 이용한 협업 내용 레포트 생성
![스크린샷 2023-07-12 오후 9 18 18](https://github.com/hodeethelion/phodo-front/assets/119830726/73c87b8c-2791-4730-a6f7-e1be102bfd67)

앞서 동시 작업했던 내용들을 취합하여 보고서의 가이드라인을 작성해주며 보고서에 회의 중 사용했던 사진을 Drag & Drop 형식으로 삽입할 수 있습니다. 
작성된 보고서를 pdf 형식으로 출력가능하고, 회의실내에 사용했던 사진들을 따로 zip file로 다운로드가 가능합니다.

### 주요 페이지
<div align="center">
  <img src="https://github.com/JinkyoJB/jungle-front/assets/85150616/49e1c287-6238-4451-98bf-73310ee2f92d" width="600">
</div>

## 기술적 챌린지 
![네트워크상황캡쳐본](https://github.com/JinkyoJB/jungle-front/assets/85150616/8e9e248e-0807-4dcc-b5eb-470a44e4c28a)
![효율적인 DB저장](https://github.com/JinkyoJB/jungle-front/assets/85150616/cf9291ba-4665-4141-aae3-acc9942b718d)
![카테고리 정확도 개선](https://github.com/JinkyoJB/jungle-front/assets/85150616/0c93abdd-af5b-4ee1-acfa-b10b62b98552)

## 서비스 구조도
<img width="308" alt="service" src="https://github.com/hodeethelion/phodo-front/assets/119830726/91e6de8a-dea5-4b8f-b8e9-1c8dabf5f7ae">

## 서비스 Poster
![Phodo-poster](https://github.com/JinkyoJB/jungle-front/assets/85150616/7b73cce0-8646-420c-bc38-941c335c3e26)
