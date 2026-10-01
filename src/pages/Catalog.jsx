import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ onAddToCart }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState('All')
    const [sortBy, setSortBy] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')

    const toggleSort = (type) => {
        if (sortBy === type) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(type)
            setSortOrder('asc')
        }
    }

    let processedGuns = GUNS.filter((gun) => {
        const matchesSearch = gun.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = filterType === 'All' || gun.type === filterType
        return matchesSearch && matchesType
    })

    processedGuns.sort((a, b) => {
        let result = 0
        if (sortBy === 'name') {
            result = a.name.localeCompare(b.name)
        } else if (sortBy === 'price') {
            result = a.price - b.price
        }
        return sortOrder === 'asc' ? result : -result
    })

    return (
        <>
            <section className="masthead">
                <h1 className="display">Hardware, by the spec sheet.</h1>
                <p className="lede">
                    A small armory of pistols, rifles, and shotguns. Every piece listed with its
                    type, caliber, and price nothing else.
                </p>
            </section>

            <section>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Search guns..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ padding: '8px 12px', flex: '1', minWidth: '200px', border: '1px solid var(--line)', borderRadius: '4px' }}
                    />

                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px' }}
                    >
                        <option value="All">All Types</option>
                        <option value="Pistol">Pistol</option>
                        <option value="Rifle">Rifle</option>
                        <option value="Shotgun">Shotgun</option>
                        <option value="Explosive">Explosive</option>
                        <option value="Heavy">Heavy</option>
                    </select>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                            onClick={() => toggleSort('name')}
                            style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px', background: sortBy === 'name' ? 'var(--brass)' : '#fff', color: sortBy === 'name' ? '#fff' : 'inherit', cursor: 'pointer' }}
                        >
                            Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                        <button 
                            onClick={() => toggleSort('price')}
                            style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px', background: sortBy === 'price' ? 'var(--brass)' : '#fff', color: sortBy === 'price' ? '#fff' : 'inherit', cursor: 'pointer' }}
                        >
                            Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                    </div>
                </div>

                <div className="list-head">
                    <h2>Current stock</h2>
                    <span className="count">{processedGuns.length} pieces</span>
                </div>

                {processedGuns.length > 0 ? (
                    <ul className="stock">
                        {processedGuns.map((gun) => <GunCard key={gun.name} gun={gun} onAddToCart={() => onAddToCart(gun)} />)}
                    </ul>
                ) : (
                    <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--steel)', fontSize: '1.2rem', fontWeight: '500' }}>
                        No guns match
                    </div>
                )}
            </section>
        </>
    )
}

export default Catalog