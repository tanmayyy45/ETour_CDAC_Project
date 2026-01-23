const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = true
}) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <nav className="pagination" aria-label="Pagination">
            {showFirstLast && (
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    aria-label="First page"
                >
                    First
                </button>
            )}

            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                    aria-current={page === currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            <button
                className="pagination-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>

            {showFirstLast && (
                <button
                    className="pagination-btn"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    aria-label="Last page"
                >
                    Last
                </button>
            )}
        </nav>
    );
};

export default Pagination;
