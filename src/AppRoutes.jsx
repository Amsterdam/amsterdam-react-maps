import HomePage from './Pages/HomePage';
import GeocoderPage from './Pages/GeocoderPage';

const AppRoutes = {
    HOME: { path: "/", component: HomePage },
    GEOCODER: {
      path: "/geocoder",
      component: GeocoderPage
    }
  };
  
  export default AppRoutes;