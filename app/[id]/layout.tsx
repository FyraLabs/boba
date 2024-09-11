const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-6 p-6">
      <main className="flex flex-wrap gap-6">{children}</main>
      <footer>
        <p className="text-muted-foreground">🄯 Fyra Labs — Boba</p>
      </footer>
    </div>
  );
};

export default Layout;
