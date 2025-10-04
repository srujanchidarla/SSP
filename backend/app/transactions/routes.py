from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models import Cart, Transaction, TransactionItem
from ..extensions import db
import qrcode
import base64
from io import BytesIO

transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('', methods=['POST'])
@jwt_required()
def checkout():
    user_id = get_jwt_identity()
    cart = Cart.query.filter_by(user_id=user_id).first()

    if not cart or not cart.items:
        return jsonify({"msg": "Cart is empty"}), 400

    total = sum(item.quantity * item.product.price for item in cart.items)
    
    # Create the transaction
    new_transaction = Transaction(user_id=user_id, total_amount=round(total, 2))
    db.session.add(new_transaction)
    
    # Copy cart items to transaction items
    for item in cart.items:
        trans_item = TransactionItem(
            transaction=new_transaction,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_purchase=item.product.price
        )
        db.session.add(trans_item)
    
    # Generate QR Code
    qr = qrcode.make(f"Transaction ID: {new_transaction.id}, Total: ${new_transaction.total_amount}")
    buffered = BytesIO()
    qr.save(buffered, format="PNG")
    qr_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    new_transaction.qr_code = f"data:image/png;base64,{qr_str}"
    
    # Clear the cart
    for item in cart.items:
        db.session.delete(item)

    db.session.commit()
    
    return jsonify({
        "msg": "Transaction successful",
        "transaction_id": new_transaction.id,
        "qr_code": new_transaction.qr_code
    }), 201

@transactions_bp.route('', methods=['GET'])
@jwt_required()
def get_transaction_history():
    user_id = get_jwt_identity()
    transactions = Transaction.query.filter_by(user_id=user_id).order_by(Transaction.created_at.desc()).all()
    history = [
        {"id": t.id, "total_amount": t.total_amount, "date": t.created_at.isoformat()}
        for t in transactions
    ]
    return jsonify(history)