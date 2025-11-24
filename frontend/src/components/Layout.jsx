function Layout({ children }) {
  return (
    <div className="layout-root">
      <div className="layout-card">
        {children}
      </div>
      <footer className="app-footer">
        <span>Powered by AQI provider via backend service</span>
      </footer>
    </div>
  );
}

export default Layout;
