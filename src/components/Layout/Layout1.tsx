const Layout1: React.FC = (props) => {
  return (
    <div className="layout1">
      <img src="/logo.png" className="absolute w-20 md:w-32 md:left-10 md:top-10" />
      {props.children}
    </div>
  );
}

export default Layout1;
