const Sidebar = ({ children, position = 'left' }) => {
    return (
        <aside className={`sidebar ${position === 'left' ? 'sidebar-left' : ''}`}>
            {children}
        </aside>
    );
};

export default Sidebar;
