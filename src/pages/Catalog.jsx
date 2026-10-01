import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterType, setFilterType] = useState('All')
    const [sortOption, setSortOption] = useState('name-asc')

    let processedGuns = GUNS.filter((gun) => {
        const matchesSearch = gun.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = filterType === 'All' || gun.type === filterType
        return matchesSearch && matchesType
    })

    processedGuns.sort((a, b) => {
        if (sortOption === 'name-asc') return a.name.localeCompare(b.name)
        if (sortOption === 'name-desc') return b.name.localeCompare(a.name)
        if (sortOption === 'price-asc') return a.price - b.price
        if (sortOption === 'price-desc') return b.price - a.price
        return 0
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

                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '4px' }}
                    >
                        <option value="name-asc">Name (A Z)</option>
                        <option value="name-desc">Name (Z A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>

                <div className="list-head">
                    <h2>Current stock</h2>
                    <span className="count">{processedGuns.length} pieces</span>
                </div>

                {processedGuns.length > 0 ? (
                    <ul className="stock">
                        {processedGuns.map((gun) => <GunCard key={gun.name} gun={gun} />)}
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