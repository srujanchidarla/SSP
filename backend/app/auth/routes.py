from flask import request, jsonify, Blueprint
from ..models import User
from ..extensions import db
from flask_jwt_extended import create_access_token, get_jwt, jwt_required

auth_bp = Blueprint('auth', __name__)
# In-memory blocklist for storing revoked tokens
BLOCKLIST = set()

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email, password = data.get('email'), data.get('password')
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already exists"}), 409
    
    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data.get('email'), data.get('password')
    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        additional_claims = {"is_admin": user.is_admin}
        access_token = create_access_token(identity=user.id, additional_claims=additional_claims)
        return jsonify(access_token=access_token)
    
    return jsonify({"msg": "Bad email or password"}), 401

@auth_bp.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLOCKLIST.add(jti)
    return jsonify(msg="Successfully logged out"), 200