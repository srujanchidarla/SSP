from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Cart, CartItem, Product
from ..extensions import db

# Corrected blueprint definition
cart_bp = Blueprint('cart', __name__)

def _get_or_create_cart(user_id):
    """Helper function to get a user's cart, creating one if it doesn't exist."""
    # A cart is unique to a user, so this is a reliable way to find it.
    cart = Cart.query.filter_by(user_id=user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.session.add(cart)
        db.session.commit()
    return cart

@cart_bp.route('', methods=['GET'])
@jwt_required()
def get_cart():
    """Retrieves the full contents of the current user's cart."""
    user_id = get_jwt_identity()
    cart = _get_or_create_cart(user_id)
    
    cart_items_data = []
    total_price = 0
    for item in cart.items:
        item_data = {
            "item_id": item.id,
            "product_id": item.product.id,
            "name": item.product.name,
            "price": item.product.price,
            "quantity": item.quantity,
            "subtotal": round(item.product.price * item.quantity, 2)
        }
        cart_items_data.append(item_data)
        total_price += item_data["subtotal"]
    
    return jsonify({
        "items": cart_items_data,
        "total": round(total_price, 2)
    })

@cart_bp.route('/items', methods=['POST'])
@jwt_required()
def add_item_to_cart():
    """Adds an item to the cart using its barcode."""
    user_id = get_jwt_identity()
    data = request.get_json()
    barcode = data.get('barcode')
    quantity = int(data.get('quantity', 1))

    if not barcode or quantity < 1:
        return jsonify({"msg": "Product barcode and valid quantity are required"})

    product = Product.query.filter_by(barcode=barcode).first()
    if not product:
        return jsonify({"msg": "Product not found"})

    cart = _get_or_create_cart(user_id)
    
    # Check if this product is already in the cart
    cart_item = CartItem.query.filter_by(cart_id=cart.id, product_id=product.id).first()

    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=product.id, quantity=quantity)
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify({"msg": f"'{product.name}' added to cart."})

@cart_bp.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_cart_item(item_id):
    """Updates the quantity of a specific item in the cart."""
    user_id = get_jwt_identity()
    data = request.get_json()
    quantity = data.get('quantity')

    if quantity is None or int(quantity) < 1:
        return jsonify({"msg": "A valid quantity is required"})
    
    cart_item = CartItem.query.get(item_id)
    
    if not cart_item or cart_item.cart.user_id != user_id:
        return jsonify({"msg": "Cart item not found"})
        
    cart_item.quantity = int(quantity)
    db.session.commit()
    return jsonify({"msg": "Cart updated."})

@cart_bp.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_item_from_cart(item_id):
    """Removes a specific item from the cart."""
    user_id = get_jwt_identity()
    cart_item = CartItem.query.get(item_id)
    
    if not cart_item or cart_item.cart.user_id != user_id:
        return jsonify({"msg": "Cart item not found"})
        
    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"msg": "Item removed from cart."})