import React from 'react'

function Cart({ cart, onUpdateQuantity, onRemove }) {
    const total = cart.reduce((sum, item) => sum + item.gun.price * item.quantity, 0)

    return (
        <section className="page">
            <h1 className="display">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="lede">Your cart is currently empty.</p>
            ) : (
                <div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                        {cart.map((item) => (
                            <li key={item.gun.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <img src={item.gun.image} alt={item.gun.name} width="80" style={{ objectFit: 'contain', background: '#fff', border: '1px solid var(--line)' }} />
                                    <div>
                                        <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>{item.gun.name}</h3>
                                        <p style={{ margin: 0, color: 'var(--brass)', fontWeight: 'bold' }}>${item.gun.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <button onClick={() => onUpdateQuantity(item.gun.name, item.quantity - 1)} style={{ padding: '4px 10px', cursor: 'pointer' }}>-</button>
                                    <span style={{ fontWeight: '600' }}>{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.gun.name, item.quantity + 1)} style={{ padding: '4px 10px', cursor: 'pointer' }}>+</button>
                                    <button onClick={() => onRemove(item.gun.name)} style={{ marginLeft: '12px', padding: '4px 10px', background: 'var(--panel)', color: 'var(--panel-text)', border: 'none', cursor: 'pointer' }}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div style={{ textAlign: 'right', fontSize: '1.2rem' }}>
                        <span style={{ marginRight: '16px' }}>Total:</span>
                        <strong className="price" style={{ fontSize: '1.5rem' }}>${total.toLocaleString()}</strong>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Cart
