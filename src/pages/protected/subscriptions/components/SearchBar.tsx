import { useState, useEffect } from "react";
import { useDebounce } from "../../../../hooks";

interface Props {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

export const SearchBar: React.FC<Props> = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery]);

    const handleClear = () => {
        setQuery("");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div className="search-bar">
            <div className="search-bar__wrapper">
                <div className="search-bar__icon">
                    🔍
                </div>
                <input
                    type="text"
                    className="search-bar__input"
                    placeholder="Search users by username..."
                    value={query}
                    onChange={handleChange}
                />
                {query && (
                    <button
                        type="button"
                        className="search-bar__clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
                {isLoading && (
                    <div className="search-bar__loading">
                        <div className="search-bar__spinner"></div>
                    </div>
                )}
            </div>
            {query && (
                <p className="search-bar__hint">
                    {isLoading ? `Searching for "${query}"...` : `Press Enter or wait to search for "${query}"`}
                </p>
            )}
        </div>
    );
};
