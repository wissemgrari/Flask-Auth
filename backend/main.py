# using flask_restful
from flask import Flask, jsonify, json, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from flask_cors import CORS
from config import *

# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

# Setup CORS
CORS(app, origins="http://localhost:5173", allow_headers=[
    "Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
    supports_credentials=True)

# Making the connection to the DataBase
try:
		# GET THE CONNECTION OBJECT (ENGINE) FOR THE DATABASE
	engine = create_engine("mysql+pymysql://{0}:{1}@{2}:{3}/{4}".format(user, password, host, port, database))
	print(f"Connection to the '{database}' database for user '{user}' created successfully.")
	
except Exception as ex:
	print("Connection could not be made due to the following error: \n", ex)

# return welcome message for the home route
@app.route('/', methods = ['GET', 'POST'])
def home():
	return "Welcome to the API"


class Login(Resource):
	# Corresponds to POST request
	def get(self):
		return jsonify({"message": "Try POST method in order to use this endpoint"})
	
	# Corresponds to POST request
	def post(self):
		
		# Get user credentials from client
		EMAIL = request.json["email"]
		PASSWORD = request.json["password"]

		query = "SELECT * FROM user WHERE email=%s && password=%s"
		res = engine.execute(query,EMAIL, PASSWORD).first()
		if(res):
			return app.response_class(response=json.dumps({"AUTHORIZATION": "ACCEPTED", "user": res._asdict()}), status=200, mimetype='application/json')
		else:
			return app.response_class(response=json.dumps({"AUTHORIZATION": "REJECTED", "message": "Invalid Credentials"}), status=401, mimetype='application/json')
	

class Register(Resource):
	def post(self):
		# Get user data from client
		FIRSTNAME = request.json['firstName']
		LASTNAME = request.json['lastName']
		EMAIL = request.json['email']
		PASSWORD = request.json['password']

		# check if user alreay exist in the database
		query = "SELECT * FROM user WHERE email LIKE %s"
		res = engine.execute(query, EMAIL).first()
		if(not res):
			query = "INSERT INTO user (firstName, lastName, email, password) VALUES (%s, %s, %s, %s)"
			res = engine.execute(query, FIRSTNAME, LASTNAME, EMAIL, PASSWORD)
			if(res):
				return app.response_class(response=json.dumps({"MESSAGE": "user created"}), status=200, mimetype='application/json')
			else:
				return app.response_class(response=json.dumps({"error": "something went wrong"}), status=400, mimetype='application/json')
		else:
			return app.response_class(response=json.dumps({"error": "email already in use"}), status=400, mimetype='application/json')
			

class Course(Resource):
	# GET all courses
	def get(self):
		query = "SELECT * FROM course"
		res = engine.execute(query).all()
		if(res):
			return jsonify({"courses": [dict(row) for row in res]})
		else:
			return jsonify({'Error', 'Something went wrong!'})
	
	# Create course
	def post(self):
		NAME = request.json['name']
		CATEGORY = request.json['category']

		query = "INSERT INTO course (name, category) VALUES (%s, %s)"
		res = engine.execute(query, NAME, CATEGORY)
		if(res):
			return app.response_class(response=json.dumps({"MESSAGE": "course created"}), status=200, mimetype='application/json')
		else:
			return app.response_class(response=json.dumps({"error": "something went wrong"}), status=400, mimetype='application/json')

	# update course
	def put(self, id):
		# Get data from client
		NAME = request.json['name']
		CATEGORY = request.json['category']

		query = "SELECT * FROM course WHERE id=%s"
		res = engine.execute(query, id).first()
		if(res):
			query = "UPDATE course SET name=%s, category=%s WHERE id=%s"
			res = engine.execute(query, NAME, CATEGORY, id)
			return app.response_class(response=json.dumps({"MESSAGE": f"course with id: {id} updated"}), status=200, mimetype='application/json')
		else:
			return app.response_class(response=json.dumps({"MESSAGE": f"There's no course with id: {id}"}), status=404, mimetype='application/json')



	# delete course
	def delete(self, id):
		# check if course exist in the DB
		query = "SELECT * FROM course WHERE id=%s"
		res = engine.execute(query, id).first()
		if(res):
			query = "DELETE FROM course WHERE id=%s"
			res = engine.execute(query, id)
			return app.response_class(response=json.dumps({"MESSAGE": f"course with id: {id} deleted"}), status=200, mimetype='application/json')
		else:
			return app.response_class(response=json.dumps({"MESSAGE": f"There's no course with id: {id}"}), status=404, mimetype='application/json')
		
# adding the defined resources along with their corresponding urls
api.add_resource(Login, '/api/login')
api.add_resource(Register, '/api/register')
api.add_resource(Course, '/api/courses', methods=['GET', 'POST'])
api.add_resource(Course, '/api/courses/<int:id>', methods=['PUT'], endpoint="put")
api.add_resource(Course, '/api/courses/<int:id>', methods=['DELETE'], endpoint="delete")

# driver function
if __name__ == '__main__':
	app.run(debug = True)