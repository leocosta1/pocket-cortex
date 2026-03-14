import { Container, Main } from './styles';

import { Outlet } from 'react-router';

import { Navbar } from '../Navbar';
import { getRoutes } from '../../config/routeConfig';

export function AppLayout() {
  const routes = getRoutes();

  return (
    <Container>
      <Main>
        <Outlet />
      </Main>

      <Navbar routes={routes} />
    </Container>
  );
}
