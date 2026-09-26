import './Searchbar.css';
import { IconSearch } from '@tabler/icons-react';

function Searchbar() {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for movies, series..."
            />
            <button><IconSearch size={20} stroke={2} /></button>
        </div>
    );
}

export default Searchbar;