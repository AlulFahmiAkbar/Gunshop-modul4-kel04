const NAV = ['Catalog', 'About', 'Contact', 'Cart']

function Header({ tab, onTab, cartCount }) {
    return (
        <header className="header">
            <span className="brand display">Bore &amp; Barrel</span>
            <nav className="nav">
                {NAV.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={tab === item ? 'nav-link active' : 'nav-link'}
                        onClick={() => onTab(item)}
                        style={{ position: 'relative' }}
                    >
                        {item}
                        {item === 'Cart' && cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-12px',
                                background: 'var(--brass)',
                                color: '#fff',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                padding: '2px 6px',
                                borderRadius: '10px'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </header>
    )
}

export default Header