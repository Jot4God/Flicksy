import './Searchbar.css';

function Searchbar() {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search for movies, series..."
            />

            <button>🔍</button>
        </div>
    );
}

export default Searchbar;