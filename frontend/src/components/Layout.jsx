function Layout({ children }) {
  return (
    <div className="layout-root">
      <div className="layout-card">
        {children}
      </div>
      <footer className="app-footer">
        <span>Powered by AQI provider</span>
      </footer>
    </div>
  );
}

export default Layout;
