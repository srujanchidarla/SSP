from app import create_app
from app.models import User, Product
from app.extensions import db

def seed_data():
    app = create_app()
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()

        print("Creating sample users...")
        # Create a regular user
        user1 = User(email='user@example.com')
        user1.set_password('password123')
        db.session.add(user1)

        # Create an admin user
        admin_user = User(email='admin@example.com', is_admin=True)
        admin_user.set_password('adminpass')
        db.session.add(admin_user)

        print("Creating sample products...")
        products = [
            Product(barcode="1234567890123", name="Organic Apples", price=2.99),
            Product(barcode="9876543210987", name="Whole Milk, 1 Gallon", price=3.49),
            Product(barcode="5555555555555", name="Sourdough Bread", price=4.99)
        ]
        db.session.bulk_save_objects(products)

        db.session.commit()
        print("✅ Database has been seeded successfully!")

if __name__ == '__main__':
    seed_data()