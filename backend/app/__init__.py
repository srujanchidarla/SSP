from flask import Flask
from config import config
from .extensions import db, migrate, jwt, cors

def create_app(config_name='default'):
    """
    Application factory function.
    Configures and returns the Flask application instance.
    """
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # --- Initialize Extensions ---
    # These are initialized with the app instance
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/api/": {"origins": ""}})

    # --- Import Models ---
    # This ensures models are registered with SQLAlchemy before a 'flask db' command is run
    from . import models

    # --- Register Blueprints ---
    # This organizes the application's routes
    from .auth.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .products.routes import product_bp
    app.register_blueprint(product_bp, url_prefix='/api/products')

    from .cart import bp as cart_bp
    app.register_blueprint(cart_bp, url_prefix='/api/cart')

    from .transactions import bp as transactions_bp
    app.register_blueprint(transactions_bp, url_prefix='/api/transactions')

    # Add other blueprints for cart and transactions as you build them
    # from .cart.routes import cart_bp
    # app.register_blueprint(cart_bp, url_prefix='/api/cart')
    # from .transactions.routes import transactions_bp
    # app.register_blueprint(transactions_bp, url_prefix='/api/transactions')

    # REMOVED: The problematic db.create_all() and create_sample_data() calls are gone.
    # The database should be managed via 'flask db' commands in the terminal.

    return app

# REMOVED: The create_sample_data function is also gone from this file.
# We will move it to a separate script.
