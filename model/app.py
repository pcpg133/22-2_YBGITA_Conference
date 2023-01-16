from flask import Flask, jsonify, request

import sys
import os
import re

import csv
import pandas as pd
import numpy as np

import time
import random
random.seed(10)
import tqdm
import openpyxl
from datetime import datetime
from tqdm.notebook import tqdm
from haversine import haversine

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import cosine_distances

app = Flask(__name__)

################################################################
################################################################
################################################################
################################################################
import time
from bs4 import BeautifulSoup
from selenium import webdriver

# 옵션 생성
option = webdriver.ChromeOptions()
# 창 숨기는 옵션 추가
#option.add_argument("headless")
# options.add_argument("lang=ko_KR")    # 가짜 플러그인 탑재
#option.add_argument("—no-sandbox")
#option.add_argument("enable-automation")

# driver 실행
driver = webdriver.Chrome(executable_path='chromedriver', options=option)
driver.get(url='https://www.yonsei.ac.kr/_custom/yonsei/m/menu.jsp')
time.sleep(1)

html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

menu = []
menu.append(soup.select_one('body > div > div.menulist > ul > li:nth-child(1) > div.detail > div:nth-child(1) > ul > li:nth-child(1) > span:nth-child(1)'))
menu.append(soup.select_one('body > div > div.menulist > ul > li:nth-child(1) > div.detail > div:nth-child(1) > ul > li:nth-child(2) > span:nth-child(1)'))
menu.append(soup.select_one('body > div > div.menulist > ul > li:nth-child(1) > div.detail > div:nth-child(2) > ul > li:nth-child(1) > span:nth-child(1)'))
menu.append(soup.select_one('body > div > div.menulist > ul > li:nth-child(1) > div.detail > div:nth-child(2) > ul > li:nth-child(2) > span:nth-child(1)'))
menu.append(soup.select_one('body > div > div.menulist > ul > li:nth-child(1) > div.detail > div:nth-child(3) > ul > li > span:nth-child(1)'))
menu.append(soup.select_one('body > div > div.menulist > ul > li:nth-child(2) > div.detail > div:nth-child(1) > ul > li > span:nth-child(1)'))
menu.append(soup.select_one('body > div > div.menulist > ul > li:nth-child(2) > div.detail > div:nth-child(2) > ul > li > span:nth-child(1)'))
menu.append(soup.select_one('body > div > div.menulist > ul > li:nth-child(2) > div.detail > div:nth-child(3) > ul > li > span:nth-child(1)'))

menu_text = []
for i in menu:
    if (i == None):
        menu_text.append("해당 요일은 운영하지 않습니다.")
    else:
        menu_text.append(i.get_text().replace('\n', ''))

menus = {
    "맛나샘": {
        "hotbowl": [menu_text[0], menu_text[1]],
        "soban": [menu_text[2], menu_text[3]],
        "nodel": [menu_text[4]]
    },
    "한경관": {
        "1층 중식": menu_text[5].split(', '),
        "2층 중식": menu_text[6].split(', '),
        "2층 석식": menu_text[7].split(', ')
    }
}        

# driver 종료
driver.quit()


################################################################
################################################################
################################################################
################################################################
import cv2, sys
from matplotlib import pyplot as plt

def get_roi(img):
    # CHECK DARK, LIGHT MODE and convert gray scale
    THEME, img_gray = handle_mode(img)
    
    if THEME == 'DARK':
        THRESHOLD_THEME = 30
    else:
        THRESHOLD_THEME = 10
    
    ret, otsu = cv2.threshold(img_gray, THRESHOLD_THEME, 255, cv2.THRESH_BINARY)
    contours, hierarchy = cv2.findContours(otsu, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
  
    # size별로 sort.
    cnts = sorted(contours, key = cv2.contourArea, reverse=True)
    
    # 가장 큰 box = ROI
    x, y, width, height = cv2.boundingRect(cnts[0])
    
    return img[y:y+height, x:x+width], THEME

def handle_mode(img):
    # 라이트 모드 대응 - 색 반전, THRESHOLD 조정
    THEME = 'DARK'
    
    if img[0][0][0] > 100:
        img = 255 - img
        THEME = 'LIGHT'

    img_conv = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return THEME, img_conv

def time_exception(custom_time):
    minute = custom_time - int(custom_time)
    minute_output = [0, 0.25, 0.5, 0.75]
    
    target = [abs(x - minute) for x in minute_output]
    output = int(custom_time) + minute_output[target.index(min(target))]
    
    return output

def get_time(img, box, box_height, box_width):

    start = end = box[0][0]
    for temp in box:
        if sum(temp[0]) > sum(end):
            end = temp[0]


    time_line = int(img.shape[0]/box_height) + 9
    class_start = (img.shape[0] - start[1])/box_height
    class_end = (end[1] - start[1])/box_height
    
    class_daytime = calculate_daytime(img.shape[1], box_width, start[0])
    class_time = calculate_time(time_line - class_start, class_end)

    return class_daytime, class_time

def get_timebox(THEME, ROI, box_height, box_width):

    if THEME == 'LIGHT': # normal theme
        # 110 이 가장 잘 나온 듯
        TEMP = 255 - ROI
        gray = cv2.cvtColor(TEMP, cv2.COLOR_BGR2GRAY)
    else:
        gray = cv2.cvtColor(ROI, cv2.COLOR_BGR2GRAY)

    ret, otsu2 = cv2.threshold(gray, -1, 255,  cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    contours, hierarchy = cv2.findContours(otsu2, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # box 크기로 필요 없는 것 제거
    results = [x for x in contours if cv2.contourArea(x) > 1000]

    export_data = {}
    
    for box in results:
        class_daytime, class_time = get_time(ROI, box, box_height, box_width)

        if class_daytime in export_data:
            export_data[class_daytime].append(class_time)
        else:
            export_data[class_daytime] = [class_time]

    return export_data

def get_standard_box_size(ROI):
    # CHECK DARK, LIGHT MODE and convert gray scale
    THEME, img_gray = handle_mode(ROI)
    
    if THEME == 'DARK':
        THRESHOLD_THEME = 30
    else:
        THRESHOLD_THEME = 10
    
    ret, otsu = cv2.threshold(img_gray, THRESHOLD_THEME, 255, cv2.THRESH_BINARY)
    contours, hierarchy = cv2.findContours(otsu, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    
    # size별로 sort.
    cnts = sorted(contours, key = cv2.contourArea, reverse=True)
    
    # 두 번째 sizse = 기본 box
    x, y, width, height = cv2.boundingRect(cnts[1])
    
    return height, width

def calculate_daytime(roi_width, box_width, startpoint):
    daytime_output = ['금','목','수','화','월']

    for daytime in daytime_output:
        roi_width = roi_width - box_width
        if roi_width - startpoint < 5:
            return daytime

def calculate_time(start, end):
    starttime_list = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    endtime_list = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    
    class_start = [abs(x - start) for x in starttime_list]
    class_end = [abs(x - (start + end)) for x in endtime_list]
    
    output_start = starttime_list[class_start.index(min(class_start))]
    output_end = endtime_list[class_end.index(min(class_end))]


    # 커스텀으로 한 시간의 경우 예외 처리 - 30분 단위로 가장 가까운 곳으로 지정
    if min(class_start) > 0.35:
        output_start = time_exception(start)
        output_end = time_exception(start + end)

    return (f'{output_start}-{output_end}')

def export_img(img):

    # get roi if needed
    ROI, THEME = get_roi(img)
    
    # 안에 아무것도 없으면서 가장 큰 box - 기준이 되는 box size.
    box_height, box_width = get_standard_box_size(ROI)
    
    # get timetable box
    output = get_timebox(THEME, ROI, box_height, box_width)
    
    return output

from PIL import Image

def test(image):
    np_img = np.array(image)
    timetable = export_img(np_img)
    return timetable







################################################################
################################################################
################################################################
################################################################
df = pd.read_excel("./final_sinchon_recommendation_system(re).xlsx")
df = df.drop(["Unnamed: 0"], axis=1)
df_x = pd.read_excel("./yonsei_building.xlsx")
df_label = pd.read_excel("./hi.xlsx")
# print(df.shape)
# print(df_x.shape)

for i in range(len(df['상호명'])):
    for j in range(len(df_label['상호명'])):
        if df.loc[i, '상호명'] in df_label.loc[j, '상호명']:
            df.loc[i, 'label'] = df_label.loc[j, 'label']

# 비고 X는 빼자
idx_1 = df[df['비고'] != 'X'].index
df = df.drop(["비고","지점명"], axis=1)
df_new = df.loc[idx_1].reset_index(drop=True)
# df_new.shape

# 중,소분류 합치기
def generate_cate(data):
    data['label'] = data['label'].astype('str')
    data['label'] = data['label'].str.replace("\"", "")
    data['cate_total'] = data['상권업종중분류명'] + ' ' + data['상권업종소분류명']
    data['cate_total'] = data['cate_total'].str.replace("/", " ")
    data['cate_total'] = data['cate_total'].str.replace("-", " ")
    #return df_new

# Weighted Rating
q = df_new['rate_count'].quantile(0.9)
d_new = df_new.loc[df_new['rate_count'] >= q]
m = df_new['kakao_rate'].mean()
    
def weighted_rating(x, q=q, m=m):
    weighted_rc = x['rate_count']
    weighted_r = x['kakao_rate']
    weighted_rating = (weighted_rc / (weighted_rc+q) * weighted_r) + (q / (q+weighted_rc) * m)
    return weighted_rating

df_new['weighted_rate'] = round(df_new.apply(weighted_rating, axis=1),1)
generate_cate(df_new)

class ContentTFIDF:
    
    def __init__(self, data):
        self.data = data

    def calculateTFIDF(self):
        tfidf = TfidfVectorizer(analyzer='word', ngram_range=(1,2))
        tfidf_content = tfidf.fit_transform(self.data['cate_total'])
        return tfidf_content
    
ct = ContentTFIDF(df_new)
ct_tfidf = ct.calculateTFIDF()
#ct_tfidf.shape

######## 최종 모델 1 ########

class ContentBasedRecommender_1:
    
    def __init__(self, data_1, data_2):
        self.data_1 = data_1
        self.data_2 = data_2
        
    def user_question(self, user_data):
#         cate_mid = list(self.data_1['상권업종중분류명'].unique())
#         cate_mid = random.sample(cate_mid, 4)
        
#         cate_sma = list(self.data_1['상권업종소분류명'].unique())
#         cate_sma = random.sample(cate_sma, 4)

#         total_dictionary = {}
#         qs=[]
#         qs.append(f"현재 사용자의 위치는?   1){self.data_2['건물'][0]} 2){self.data_2['건물'][1]} 3){self.data_2['건물'][2]} 4){self.data_2['건물'][3]} 5){self.data_2['건물'][4]} 6){self.data_2['건물'][5]} 7){self.data_2['건물'][6]} 8){self.data_2['건물'][7]} 9){self.data_2['건물'][8]} 10){self.data_2['건물'][9]} 11){self.data_2['건물'][10]}")
#         qs.append("공강시간을 알려주세요 1)1시간 2)2시간 3)3시간이상")
#         qs.append(f"1) 데이트 2) 시험/과제 3) 다이어트 4) 맛집 5) 타대생X 6) 빠른추천")
#         qs.append(f"원하는 유형의 음식은? 1){cate_mid[0]} 2){cate_mid[1]} 3){cate_mid[2]} 4{cate_mid[3]}")
#         qs.append(f"지금 땡기는 메뉴는? 1){cate_sma[0]} 2){cate_sma[1]} 3){cate_sma[2]} 4{cate_sma[3]}")
#         qs.append("끝")

#         for q in qs:
#             question = q
#             if question == "끝":
#                 break
#             else:
#                 total_dictionary[question] = ""

#         for i in total_dictionary:
#             print(i)
#             answer = input()
#             total_dictionary[i] = answer 

#         lst = list(total_dictionary.items())
#         self.place = lst[0][1]
#         self.time = lst[1][1]
#         self.category = lst[2][1]
#         self.mid = lst[3][1]
#         self.sma = lst[4][1]
        
#         return [self.place, self.time, self.category, self.mid, self.sma]
        self.place = user_data[0]
        self.time = user_data[1]
        self.category = user_data[2]
        self.mid = user_data[3]
        self.sma = user_data[4]
        self.options = self.mid + ' ' + self.sma
    
    def question_recommendation(self):
        lon = self.data_2[self.data_2['건물']==self.place]['경도'].item()
        lat = self.data_2[self.data_2['건물']==self.place]['위도'].item()
        place_haver = [lat,lon]
        
        distance = []
        for i in range(len(self.data_1)):
            rest_haver = [self.data_1.loc[i,'위도'], self.data_1.loc[i,'경도']]
            haver_sine = haversine(place_haver,rest_haver) * 1000
            distance.append(haver_sine)
        
        self.data_1['distance'] = distance
        
        if self.time == "1시간":
            result_1 = self.data_1[self.data_1['distance'] <= self.data_1['distance'].quantile(0.4)]
            result = result_1.sort_values(by='distance')
        elif self.time == "2시간":
            result_2 = self.data_1[self.data_1['distance'] <= self.data_1['distance'].quantile(0.5)]
            result = result_2.sort_values(by='distance')
        else:
            result_3 = self.data_1[self.data_1['weighted_rate'] >= self.data_1['weighted_rate'].quantile(0.5)]
            result = result_3.sort_values(by="weighted_rate")
            
        return result[['상호명', '상권업종중분류명', '상권업종소분류명', '도로명주소', '경도', '위도', 'rate_count', 'food_image', 'weighted_rate', 'distance', 'label', 'cate_total']]

    def type_recommendation(self, question_data): # question_data는 question_recommendation값
        if self.category == "데이트":
            keyword = ["대화", "데이트", "특별", "인테리어", "디저트", "분위기"]
            join_keyword = '|'.join(keyword)
            return question_data[question_data['label'].str.contains(join_keyword)]
            
        elif self.category == "혼밥":
            keyword = ["혼밥", "양", "넓어요", "가성비"]
            join_keyword = '|'.join(keyword)
            return question_data[question_data['label'].str.contains(join_keyword)]
        
        elif self.category == "다이어트":
            keyword = ["비건", "신선"]
            join_keyword = '|'.join(keyword)
            return question_data[question_data['label'].str.contains(join_keyword)]
            
        elif self.category == "찐맛집":
            keyword = ["맛있어요", "맛집"]
            join_keyword = '|'.join(keyword)
            return question_data[question_data['label'].str.contains(join_keyword)]
            
        elif self.category == "모임":
            keyword = ["모임", "단체", "회식"]
            join_keyword = '|'.join(keyword)
            return question_data[question_data['label'].str.contains(join_keyword)]
            
        else: 
            return question_data

    def category_recommendation(self, type_data): # type_data는 type_recommendation값
        
        type_data = type_data.reset_index(drop=True)
        type_data.loc[type_data.index.max() + 1, ['cate_total']] = self.options

        # TF-IDF
        tfidf = TfidfVectorizer(analyzer='word', ngram_range=(1,2))
        tf_cate = tfidf.fit_transform(type_data['cate_total'])

        # 코사인 유사도
        cs_cate = cosine_similarity(tf_cate, tf_cate)

        #특정 장르 정보 뽑아오기
        target_genre_index = type_data[type_data['cate_total'] == self.options].index.max()

        # 입력한 정보의 유사도 데이터 프레임 추가
        type_data["cos_similarity"] = cs_cate[target_genre_index, :].reshape(-1,1)
        sim_genre_index = type_data[type_data.index != target_genre_index].index
        sim_genre = type_data.iloc[sim_genre_index].sort_values(by="cos_similarity", ascending=False)
        final_index = sim_genre.index.values[:15]
        final_result = type_data.iloc[final_index]
        

        return final_result

################################################################
################################################################
################################################################
################################################################
@app.route('/cafeteria', methods=['GET'])
def cafeteria():
    return jsonify(menus)

@app.route('/empty', methods=['GET'])
def empty():
    image = cv2.imread('../server/uploads/schedule.jpeg')
    return jsonify(test(image))

@app.route('/model', methods=['POST'])
def model():
    parsed_request = []
    parsed_request.append(request.json.get("building"))
    parsed_request.append(request.json.get("emptyTime"))
    parsed_request.append(request.json.get("label"))
    parsed_request.append(request.json.get("Mcategory"))
    parsed_request.append(request.json.get("Scategory"))
    print(parsed_request)

    a = ContentBasedRecommender_1(df_new, df_x)
    a.user_question(parsed_request)
    c = a.question_recommendation()
    d = a.type_recommendation(c)
    e = a.category_recommendation(d)
    #e = e.to_json(force_ascii=False, orient='records')

    result = {}
    for i in range(15):
        result[i] = {
            '상호명': e.iloc[i]['상호명'], 
            '도로명주소': e.iloc[i]['도로명주소'],
            '위도': e.iloc[i]['위도'],
            '경도': e.iloc[i]['경도'],
            '이미지': str(e.iloc[i]['food_image']).split(','),
            '별점': e.iloc[i]['weighted_rate'],
            'label': str(e.iloc[i]['label']).split(','),
            '카테고리': [str(e.iloc[i]['상권업종중분류명']), ' ' + str(e.iloc[i]['상권업종소분류명'])],
            '정확도': e.iloc[i]['cos_similarity'],
            '리뷰개수': e.iloc[i]['rate_count']
        }

    # {
            # '상호명': e.iloc[i]['상호명'], 
            # '도로명주소': e.iloc[i]['도로명주소'],
            # '위도': e.iloc[i]['위도'],
            # '경도': e.iloc[i]['경도'],
            # '이미지': str(e.iloc[i]['food_image']).split(','),
            # '별점': e.iloc[i]['weighted_rate'],
            # 'label': str(e.iloc[i]['label']).split(','),
            # '카테고리': str(e.iloc[i]['cate_total']).split(' '),
            # '정확도': e.iloc[i]['cos_similarity'],
            # '리뷰개수': e.iloc[i]['rate_count']
    #     }
    return result


@app.route('/model2', methods=['POST'])
def model2():
    return 0

@app.route('/')
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(port=3000, debug=True)