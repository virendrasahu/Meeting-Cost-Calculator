import React from 'react';
import { Search, Filter } from 'lucide-react';

const FilterBar = ({ searchTerm, setSearchTerm, filterCategory, setFilterCategory }) => {
  return (
    <div className="glass-panel" style={{ marginBottom: '1.5rem', padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <div className="input-group" style={{ margin: 0, flex: '1 1 200px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="input-field"
            placeholder="Search by agenda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem', width: '100%' }}
          />
        </div>
      </div>
      
      <div className="input-group" style={{ margin: 0, flex: '0 1 200px' }}>
        <div style={{ position: 'relative' }}>
          <Filter size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <select 
            className="input-field" 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ paddingLeft: '2.5rem', appearance: 'none', width: '100%', cursor: 'pointer' }}
          >
            <option value="All">All Categories</option>
            <option value="Affordable">Affordable (&lt;$100)</option>
            <option value="Moderate">Moderate ($100-$500)</option>
            <option value="Expensive">Expensive (&gt;$500)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
