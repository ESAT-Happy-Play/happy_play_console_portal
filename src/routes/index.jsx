import { Route } from "react-router-dom";
import LayoutWrapper from '../components/layout/LayoutWrapper'
import appRoutes from "./appRoutes";
  
const generateRoute = (routes) => {
  return routes.map((route, index) => (
    route.index ? (
      <Route index
        path={route.path}
        element={<LayoutWrapper state={route.state}>
          {route.element}
        </LayoutWrapper>}
        key={index}
      />
    ) : (
      <Route
        path={route.path}
        element={
          <LayoutWrapper state={route.child ? undefined : route.state}>
            {route.element}
          </LayoutWrapper>
        } key={index} >
        {route.child && (
          generateRoute(route.child)
        )}
      </Route>
    )
  ));
};

export const routes = generateRoute(appRoutes);