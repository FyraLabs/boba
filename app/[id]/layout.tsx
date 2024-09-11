// NOTE: We need to have a layout, even as simple as this one, in order to use `loader.tsx` it seems
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section>{children}</section>;
};

export default Layout;
