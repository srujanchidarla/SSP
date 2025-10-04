from flask import Flask
from config import Config
from .extensions import db, migrate, jwt, cors

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    print(f"--- Loaded JWT Secret Key: '{app.config.get('JWT_SECRET_KEY')}' ---")

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # Import models to ensure they are registered
    from . import models

    # Register blueprints
    from .auth.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .users.routes import users_bp
    app.register_blueprint(users_bp, url_prefix='/api/profile')

    from .products.routes import product_bp
    app.register_blueprint(product_bp, url_prefix='/api/products')

    from .cart.routes import cart_bp
    app.register_blueprint(cart_bp, url_prefix='/api/cart')

    from .transactions.routes import transactions_bp
    app.register_blueprint(transactions_bp, url_prefix='/api/transactions')

    return app