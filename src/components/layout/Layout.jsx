import Conteiner from 'components/conteiner/conteiner';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const Layout = () => {
  return (
    <>
      <Conteiner>
        <Header />
      </Conteiner>

      <main>
        <Outlet />
      </main>
    </>
  );
};
export default Layout;
