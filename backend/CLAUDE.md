# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SmartScan Pro is a web-based self-checkout application backend built with Flask. It provides REST APIs for user authentication, product management via barcode scanning, shopping cart operations, and transaction processing with QR code generation.

## Development Commands

### Environment Setup
```bash
# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Database Operations
```bash
# Initialize database (first time setup)
flask db init

# Create migration after model changes
flask db migrate -m "description"

# Apply migrations
flask db upgrade

# Seed database with sample data
python seed.py
```

### Running the Application
```bash
# Run development server (default: http://127.0.0.1:5000)
python run.py

# Or using Flask directly
flask run
```

## Architecture

### Application Factory Pattern
The app uses the factory pattern via `create_app()` in `app/__init__.py`. This function:
- Initializes Flask extensions (SQLAlchemy, JWT, CORS, Flask-Migrate)
- Registers all blueprints with `/api` prefix routing
- Configures JWT blocklist for logout functionality
- Imports models to register them with SQLAlchemy

### Project Structure
```
backend/
├── app/
│   ├── __init__.py          # Application factory
│   ├── models.py            # All SQLAlchemy models
│   ├── extensions.py        # Flask extension instances
│   ├── decorators.py        # Custom decorators (admin_required)
│   ├── auth/routes.py       # /api/auth endpoints
│   ├── products/routes.py   # /api/products endpoints
│   ├── cart/routes.py       # /api/cart endpoints
│   └── transactions/routes.py # /api/transactions endpoints
├── config.py                # Configuration (loads from .env)
├── run.py                   # Entry point
└── seed.py                  # Database seeding script
```

### Database Models
All models are defined in `app/models.py`:

- **User**: Stores credentials with hashed passwords, has `is_admin` flag
  - Relationships: one Cart, many Transactions
- **Product**: Stores barcode (unique), name, and price
- **Cart**: One-to-one with User
  - Contains CartItems via relationship
- **CartItem**: Links Cart to Products with quantity
- **Transaction**: Records completed purchases with total_amount and QR code
  - Contains TransactionItems via relationship
- **TransactionItem**: Stores product_id, quantity, and price_at_purchase (snapshot)

### Authentication & Authorization
- JWT tokens via `Flask-JWT-Extended` with 24-hour expiration
- `BLOCKLIST` set in `auth/routes.py` tracks logged-out tokens
- `@admin_required()` decorator in `decorators.py` checks `is_admin` claim in JWT
- User passwords hashed with Werkzeug's `generate_password_hash()`

### API Blueprint Structure
Each feature has its own blueprint registered with a URL prefix:
- `/api/auth` - register, login, logout, profile
- `/api/products` - CRUD operations (admin-only for create/update)
- `/api/cart` - get cart, add/update/remove items
- `/api/transactions` - checkout (POST), transaction history (GET)

### Key Implementation Details

**Cart Management** (`cart/routes.py`):
- Helper function `_get_or_create_cart()` ensures each user has exactly one cart
- Adding items by barcode: looks up Product, creates or updates CartItem
- Cart items accumulate quantities if product already exists

**Transaction Processing** (`transactions/routes.py`):
- Checkout creates Transaction and copies CartItems to TransactionItems
- Captures `price_at_purchase` to preserve historical pricing
- Generates QR code as base64-encoded data URL using `qrcode` library
- Clears cart after successful checkout

**Product Lookup**:
- Products can be fetched by barcode string via `/api/products/<barcode>`
- Used by cart operations when scanning barcodes

## Configuration

Configuration is loaded from `.env` file via `config.py`:
- `SECRET_KEY` - Flask secret key
- `JWT_SECRET_KEY` - JWT signing key
- `DATABASE_URL` - Database connection (defaults to SQLite: `sqlite:///smartscan.db`)

Database file location: `instance/smartscan.db`

## Testing Notes

Use `seed.py` to populate database with:
- Regular user: `user@example.com` / `password123`
- Admin user: `admin@example.com` / `adminpass`
- Three sample products with barcodes

## Important Patterns

1. **User Identity in Routes**: Use `get_jwt_identity()` to retrieve user_id from JWT token
2. **Barcode as Primary Lookup**: Products are primarily accessed via barcode string, not ID
3. **Cascade Deletes**: Cart and Transaction relationships use `cascade="all, delete-orphan"`
4. **Admin Protection**: Product creation/updates require `@admin_required()` decorator
5. **CORS Configuration**: Configured in `app/__init__.py` for `/api/` routes
