const PageNotFound = () => {
    return (
        <div className="errors">
            <h1>404</h1>
            <p>Page Not Found</p>
            <Link to="/">Home</Link>
        </div>
    );
}

export default PageNotFound;