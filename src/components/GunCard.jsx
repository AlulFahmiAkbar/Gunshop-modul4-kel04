import { useRef } from 'react'

function GunCard({ gun, onAddToCart }) {
    const popup = useRef(null)

    return (
        <li className="card">
            <button className="card-btn" onClick={() => popup.current.showModal()}>
                <img className="card-img" src={gun.image} alt="" width="120" height="90" />
                <span className="name display">{gun.name}</span>
                <span className="type">
                    {gun.type} · {gun.caliber}
                </span>
                <span className="price">${gun.price.toLocaleString()}</span>
            </button>
            <div style={{ padding: '0 14px 14px', border: '1px solid var(--line)', borderTop: 'none', background: '#fff' }}>
                <button 
                    onClick={onAddToCart}
                    style={{ width: '100%', padding: '8px', background: 'var(--brass)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    Add to Cart
                </button>
            </div>

            <dialog
                className="popup"
                ref={popup}
                onClick={(e) => e.target === popup.current && popup.current.close()}
            >
                <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
                <h3 className="display">{gun.name}</h3>
                <p className="type">
                    {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
                </p>
                <p>{gun.description}</p>
                <form method="dialog" style={{ display: 'flex', gap: '12px' }}>
                    <button className="popup-close">Close</button>
                    <button 
                        type="button"
                        onClick={() => {
                            onAddToCart();
                            popup.current.close();
                        }}
                        className="popup-close"
                        style={{ background: 'var(--brass)', color: '#fff', borderColor: 'var(--brass)' }}
                    >
                        Add to Cart
                    </button>
                </form>
            </dialog>
        </li>
    )
}

export default GunCard