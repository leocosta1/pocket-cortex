import { Nav, Button } from './styles';

import type { Route } from '../../config/routeConfig';

interface NavbarProps {
  routes: Route[];
}

export function Navbar({ routes }: NavbarProps) {
  return (
    <Nav>
      {routes.map((route) => (
        <Button key={route.path} to={route.path}>
          <route.icon />
          <span>{route.label}</span>
        </Button>
      ))}
    </Nav>
  );
}
