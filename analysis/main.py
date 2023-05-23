from flask import Flask, jsonify, request, make_response
from flask_restx import Api, Resource, fields
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import NearestNeighbors
import numpy as np
import warnings
warnings.filterwarnings('ignore')
import random

app = Flask(__name__)
api = Api(
    app,
    version='1.0',
    title='Students Performance',
    description='API for analysis of Educational Data'
)

student_model = api.model('Student', {
    'id': fields.Integer,
    'surname': fields.String,
    'name': fields.String,
    'patronymic': fields.String,
    'isMale': fields.Integer,
    'ЕГЭ Математика': fields.Integer,
    'ЕГЭ Русский': fields.Integer,
    'ЕГЭ Обществознание': fields.Integer,
    'ЕГЭ Информатика': fields.Integer,
    'Возраст': fields.Integer,
    'Город': fields.String,
    'Направление': fields.String,
    'Форма': fields.String
})

@api.route('/abit_clustering')
class ClusteringResource(Resource):
    @api.expect([student_model], validate=True)
    @api.doc(responses={
        200: 'Корректные данные',
        400: 'Некорректные данные'
    })
    def post(self):
        data = api.payload
        if data is None or len(data) == 0:
            return {'message': 'Некорректные данные. Необходимо предоставить хотя бы одну запись абитуриента'}, 400
        
        data = pd.DataFrame(data)

        data_pmi = data[data['Направление'] == 'ПМИ']
        data_pomo = data[data['Направление'] == 'ПОмо']
        data_pomo = data_pomo.drop(['id', 'surname', 'name', 'patronymic', 'ЕГЭ Информатика'], axis=1)
        data_pomo = data_pomo.fillna(0)
        category = ['Направление', 'Форма', 'Город']
        enc = OneHotEncoder(sparse=False, handle_unknown='ignore')
        enc.fit(data_pomo[category])
        data_pomo_clust = data_pomo.copy()
        data_pomo_clust[enc.get_feature_names_out()] = enc.transform(data_pomo_clust[category])
        data_pomo_clust = data_pomo_clust.drop(category, axis=1)
        model = KMeans(n_clusters=3, random_state=12345)
        predicted = model.fit_predict(data_pomo_clust)
        data_pomo['Группа'] = predicted + 1
        data.loc[data['Направление'] == 'ПМИ', 'Группа'] = 4
        data.loc[data['Направление'] == 'ПОмо', 'Группа'] = data_pomo['Группа']

        response = make_response(jsonify(data.to_dict(orient='records')))
        response.headers['Content-Type'] = 'application/json'
        return response


learn_model = api.model('GraduateLearn', {
    'Пол': fields.String,
    'ЕГЭ Математика': fields.Integer,
    'ЕГЭ Русский Язык': fields.Integer,
    'ЕГЭ Обществознание': fields.Integer,
    'Аналитическая геометрия': fields.Integer,
    'Введение в алгебру и математический анализ': fields.Integer,
    'История': fields.Integer,
    'Геометрия (1)': fields.Integer,
    'Иностранный язык': fields.Integer,
    'Математический анализ (1)': fields.Integer,
    'Алгебра (1)': fields.Integer,
    'Философия': fields.Integer,
    'Дополнительные главы линейной алгебры': fields.Integer,
    'Математический анализ (2)': fields.Integer,
    'Теория вероятностей и МС': fields.Integer,
    'Дополнительные главы математического анализа': fields.Integer,
    'Алгебра (2)': fields.Integer,
    'Геометрия (2)': fields.Integer,
    'Решение психологических проблем в педагогической деятельности': fields.Integer,
    'Физика': fields.Integer,
    'Решение педагогических задач': fields.Integer,
    'Алгебра (3)': fields.Integer,
    'Теория функций и функциональный анализ': fields.Integer,
    'МОВ': fields.Integer,
    'Дифференциальные уравнения': fields.Integer,
    'Решение профессиональных задач учителя': fields.Integer,
    'Основы математической логики': fields.Integer,
    'Образовательные технологии (мат. обр.)': fields.Integer,
    'Организация дополнительного образования': fields.Integer,
})


model_for_predict = api.model('Graduate', {
    'studentId': fields.Integer,
    'Пол': fields.String,
    'ЕГЭ Математика': fields.Integer,
    'ЕГЭ Русский Язык': fields.Integer,
    'ЕГЭ Обществознание': fields.Integer,
    'Аналитическая геометрия': fields.Integer,
    'Введение в алгебру и математический анализ': fields.Integer,
    'История': fields.Integer,
    'Геометрия (1)': fields.Integer,
    'Иностранный язык': fields.Integer,
    'Математический анализ (1)': fields.Integer,
    'Алгебра (1)': fields.Integer,
    'Философия': fields.Integer,
    'Дополнительные главы линейной алгебры': fields.Integer,
    'Математический анализ (2)': fields.Integer,
    'Теория вероятностей и МС': fields.Integer,
    'Дополнительные главы математического анализа': fields.Integer,
    'Алгебра (2)': fields.Integer,
    'Геометрия (2)': fields.Integer,
    'Решение психологических проблем в педагогической деятельности': fields.Integer,
    'Физика': fields.Integer,
    'Решение педагогических задач': fields.Integer,
    'Алгебра (3)': fields.Integer,
    'Теория функций и функциональный анализ': fields.Integer,
    'МОВ': fields.Integer,
    'Дифференциальные уравнения': fields.Integer,
    'Решение профессиональных задач учителя': fields.Integer,
    'Основы математической логики': fields.Integer,
    'Образовательные технологии (мат. обр.)': fields.Integer,
    'Организация дополнительного образования': fields.Integer,
})

@api.route('/predict_gos_exams')
class PredictGosExamsResource(Resource):
    # @api.expect([learn_model, subject_model], validate=True)
    # @api.marshal_with(result_model)
    @api.expect({
        'learn': fields.Nested(learn_model),
        'predict': fields.Nested(model_for_predict),
    })
    @api.doc(responses={
        200: 'Корректные данные',
        400: 'Некорректные данные'
    })
    def post(self):
    #обучение моделей
        models_for_prediction = {}

        def machine_learning(name_model, model, features_train, target_train, features_valid, target_valid,
                            hyperparams=None, state=42):
            if name_model == 'Логистическая регрессия':
                model.fit(features_train, target_train)
                accuracy_score = model.score(features_valid, target_valid) 
                print(f'accuracy_score: {accuracy_score}')
                return ['Логистическая регрессия', None, accuracy_score, model]
            else:
                clf = GridSearchCV(model, hyperparams, scoring='accuracy')
                clf.fit(features_train, target_train)
                best_params = clf.best_params_
                print('Наилучшие параметры: ', best_params)
                return best_params
        
        def encoder(category, features_train, features_valid):
            enc = OneHotEncoder(sparse=False, handle_unknown='ignore')
            features_train1 = features_train.copy()
            enc.fit(features_train1[category])
            features_train1[enc.get_feature_names_out()] = enc.transform(features_train1[category])
            features_train1 = features_train1.drop(category, axis=1)
            features_valid1 = features_valid.copy()
            features_valid1[enc.get_feature_names_out()] = enc.transform(features_valid1[category])
            features_valid1 = features_valid1.drop(category, axis=1)
            return features_train1, features_valid1
        
        def encode_predict(category, dataset):
            enc = OneHotEncoder(sparse=False, handle_unknown='ignore')
            dataset = dataset.copy()
            enc.fit(dataset[category])
            dataset[enc.get_feature_names_out()] = enc.transform(dataset[category])
            dataset = dataset.drop(category, axis=1)
            return dataset
        

        # добавление результата в список
        def add_result(name_model, model, params, features_train, target_train, features_valid, target_valid):
            model.fit(features_train, target_train) 
            if name_model != 'k-ближайших соседей':
                accuracy = model.score(features_valid, target_valid) 
            else:  
                distances, indices = model.kneighbors(features_valid)
                predicted_valid = []
                for i in range(len(indices)):
                    neighbor_labels = [list(target_train)[j] for j in indices[i]]
                    predicted_valid.append(round(max(set(neighbor_labels), key = neighbor_labels.count)))
                accuracy = accuracy_score(target_valid, predicted_valid) 
            print(f'accuracy_score: {accuracy}')
            return [name_model, params, accuracy, model]

        data = api.payload
        data = data['learn']
        if data is None or len(data) == 0:
            return {'message': 'Некорректные данные. Необходимо предоставить хотя бы одну запись выпускника.'}, 400
        
        data = pd.DataFrame(data)
        data = data.fillna(0)
        data_train, data_valid = train_test_split(data, test_size=0.2, random_state=42)
        features_train = data_train.drop(['Государственный экзамен по образовательной программе', 
                                'Защита выпускной квалификационной работы'], axis=1)
        target_train1 = data_train['Государственный экзамен по образовательной программе']
        target_train2 = data_train['Защита выпускной квалификационной работы']
        features_valid = data_valid.drop(['Государственный экзамен по образовательной программе', 
                                        'Защита выпускной квалификационной работы'], axis=1)
        target_valid1 = data_valid['Государственный экзамен по образовательной программе']
        target_valid2 = data_valid['Защита выпускной квалификационной работы']

        tmp_data = data
        tmp1 = tmp_data.drop(['Государственный экзамен по образовательной программе', 
                                'Защита выпускной квалификационной работы'], axis=1)
        tmp2 = tmp_data['Государственный экзамен по образовательной программе']
        tmp3 = tmp_data['Защита выпускной квалификационной работы']

        tmp1.to_csv('features_train_gos_diplom.csv', index=False)
        tmp2.to_csv('target_train1_gos_diplom.csv', index=False)
        tmp3.to_csv('target_train2_gos_diplom.csv', index=False)


        category = ['Пол']
        features_train1, features_valid1 = encoder(category, features_train, features_valid)

        #Обучение для госов
        result_models = []
        result = machine_learning('Логистическая регрессия', LogisticRegression(), features_train1, target_train1, 
                          features_valid1, target_valid1)
        result_models.append(result)
        hyperparams = [{'max_depth': [x for x in range(2, 20)], 
                'random_state': [42]}]
        result = machine_learning('Решающее дерево', DecisionTreeClassifier(), features_train1, target_train1, features_valid1, 
                                target_valid1, hyperparams=hyperparams)
        model = DecisionTreeClassifier(max_depth=result['max_depth'], random_state=result['random_state'])
        result_models.append(add_result('Решающее дерево', model, f'max_depth = {result["max_depth"]}', 
                                        features_train1, target_train1, features_valid1, target_valid1))
        
        #k ближайших соседей
        hyperparams = [{'n_neighbors': [x for x in range(2, 20)]}]
        result = machine_learning('Решающее дерево', NearestNeighbors(), features_train1, target_train1, features_valid1, 
                                target_valid1, hyperparams=hyperparams)
        model = NearestNeighbors(n_neighbors=result['n_neighbors'])
        result_models.append(add_result('k-ближайших соседей', model, f'n_neighbors = {result["n_neighbors"]}', 
                                        features_train1, target_train1, features_valid1, target_valid1))
        
        #Выбор лучшей модели
        best_models = pd.DataFrame(data=result_models, columns = ['name_models', 'depth_or_est', 'result_vaild', 'models'])
        best_model_idx = best_models['result_vaild'].idxmax()
        best_models.loc[best_model_idx]

        #Наилучшая модель
        models_for_prediction['gos_exam'] = best_models.loc[best_model_idx]['models']
        
        #Обучение для защиты
        result_models = []
        
        #Логистическая регрессия
        result = machine_learning('Логистическая регрессия', LogisticRegression(), features_train1, target_train2, 
                          features_valid1, target_valid2)
        result_models.append(result)

        #Решающее дерево
        hyperparams = [{'max_depth': [x for x in range(2, 20)], 
                'random_state': [42]}]
        result = machine_learning('Решающее дерево', DecisionTreeClassifier(), features_train1, target_train2, features_valid1, 
                                target_valid2, hyperparams=hyperparams)
        model = DecisionTreeClassifier(max_depth=result['max_depth'], random_state=result['random_state'])
        result_models.append(add_result('Решающее дерево', model, f'max_depth = {result["max_depth"]}', 
                                        features_train1, target_train2, features_valid1, target_valid2))

        #k-ближайших соседей
        hyperparams = [{'n_neighbors': [x for x in range(2, 20)]}]
        result = machine_learning('k-ближайших соседей', NearestNeighbors(), features_train1, target_train2, features_valid1, 
                                target_valid2, hyperparams=hyperparams)
        model = NearestNeighbors(n_neighbors=result['n_neighbors'])
        result_models.append(add_result('k-ближайших соседей', model, f'n_neighbors = {result["n_neighbors"]}', 
                                        features_train1, target_train2, features_valid1, target_valid2))
        
        #Выбор лучшей модели
        best_models = pd.DataFrame(data=result_models, columns = ['name_models', 'depth_or_est', 'result_vaild', 'models'])
        best_model_idx = best_models['result_vaild'].idxmax()
        best_models.loc[best_model_idx]

        #Наилучшая модель
        models_for_prediction['diplom'] = best_models.loc[best_model_idx]['models']

        results = {
            'gos_exam': f'{str(models_for_prediction["gos_exam"])}',
            'diplom': f'{str(models_for_prediction["diplom"])}',
        }




        def predict(data, goal, features_train, target_train):
            category = ['Пол']
            enc = OneHotEncoder(sparse=False, handle_unknown='ignore')
            enc.fit(data[category])
            data1 = data.copy()
            data1[enc.get_feature_names_out()] = enc.transform(data1[category])
            data1 = data1.drop(category, axis=1)
            model = models_for_prediction[goal]
            model.fit(features_train, target_train) 
            predicted = model.predict(data1)

            data[goal] = predicted
            return data    

        features_train_gos_diplom = pd.read_csv('features_train_gos_diplom.csv')
        target_train1_gos_diplom = pd.read_csv('target_train1_gos_diplom.csv')
        target_train2_gos_diplom = pd.read_csv('target_train2_gos_diplom.csv')

        features_train_gos_diplom.fillna(0)


        features_train_gos_diplom = encode_predict(['Пол'], features_train_gos_diplom)

        predict_data = api.payload['predict']
        predict_data = pd.DataFrame(predict_data)
        predict_data.fillna(0)
        predict_ids = predict_data['studentId']
        predict_data = predict_data.drop('studentId', axis=1)
        

        gos_ex_data = predict_data.copy()
        diplom_data = predict_data.copy()

        res_gos_exam = predict(gos_ex_data, 'gos_exam', features_train_gos_diplom, target_train1_gos_diplom)
        res_diplom = predict(diplom_data, 'diplom', features_train_gos_diplom, target_train2_gos_diplom)

        # res_gos_exam['studentId'] = predict_ids
        # result_prediction = res_gos_exam['gos_exam']
        # result_prediction['diplom'] = res_diplom['diplom']


        tmp = pd.DataFrame({'studentId': predict_ids, 'gos_exam': res_gos_exam['gos_exam'], 'diplom': res_diplom['diplom']})

        response = make_response(jsonify(tmp.to_dict(orient='records')))
        response.headers['Content-Type'] = 'application/json'
        return response










if __name__ == '__main__':
    app.run(debug=True)
