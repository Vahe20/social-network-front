import { useHttp } from "../../../../hooks";
import type { ISearchResponse } from "../../../../types/utility";

interface Props {
    username: string;
}

export const UserSearch: React.FC<Props> = ({ username }) => {
    const { data, loading, error, refetch } = useHttp<ISearchResponse>(
        `/account/search/${username}`
    );

    if (loading) {
        return (
            <div className="user-search__loading">
                <div className="spinner"></div>
                <p>Searching users...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-search__error">
                <p>❌ Error: {error}</p>
                <button onClick={refetch}>🔄 Retry</button>
            </div>
        );
    }

    if (!data || !data.users || data.users.length === 0) {
        return (
            <div className="user-search__empty">
                <p>No users found for "{username}"</p>
            </div>
        );
    }

    return (
        <div className="user-search__results">
            <h3>Found {data.users.length} users:</h3>
            <ul>
                {data.users.map((user) => (
                    <li key={user.id}>
                        <div className="user-card">
                            <img
                                src={user.avatar || '/default-avatar.png'}
                                alt={user.username}
                            />
                            <div>
                                <h4>{user.firstName} {user.lastName}</h4>
                                <p>@{user.username}</p>
                                {user.bio && <p>{user.bio}</p>}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
