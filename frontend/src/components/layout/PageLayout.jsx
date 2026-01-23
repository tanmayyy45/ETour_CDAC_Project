import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ children, showCrawl = false, crawlText = '' }) => {
    return (
        <div className="page-layout">
            <Header />

            {showCrawl && crawlText && (
                <div className="crawl-banner">
                    <div className="crawl-text">{crawlText}</div>
                </div>
            )}

            <main className="page-content">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default PageLayout;
