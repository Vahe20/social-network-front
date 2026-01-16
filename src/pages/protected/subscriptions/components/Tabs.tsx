interface Props {
    activeTab: 'search' | 'following' | 'followers';
    onTabChange: (tab: 'search' | 'following' | 'followers') => void;
    counts: {
        following: number;
        followers: number;
    };
}

export const Tabs: React.FC<Props> = ({ activeTab, onTabChange, counts }) => {
    return (
        <div className="tabs">
            <button
                className={`tabs__item ${activeTab === 'search' ? 'tabs__item--active' : ''}`}
                onClick={() => onTabChange('search')}
            >
                <span className="tabs__icon">🔍</span>
                <span className="tabs__label">Search</span>
            </button>

            <button
                className={`tabs__item ${activeTab === 'following' ? 'tabs__item--active' : ''}`}
                onClick={() => onTabChange('following')}
            >
                <span className="tabs__icon">👥</span>
                <span className="tabs__label">Following</span>
                <span className="tabs__count">{counts.following}</span>
            </button>

            <button
                className={`tabs__item ${activeTab === 'followers' ? 'tabs__item--active' : ''}`}
                onClick={() => onTabChange('followers')}
            >
                <span className="tabs__icon">👋</span>
                <span className="tabs__label">Followers</span>
                <span className="tabs__count">{counts.followers}</span>
            </button>
        </div>
    );
};
