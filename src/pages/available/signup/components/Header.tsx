export const Header = ({ error }: { error: string }) => {
    return (
        <div className="regLog__header">
            <h2>Signup</h2>
            <p>Join our community today</p>
            {error && <span className='error'>{error}</span>}
        </div>
    )
}