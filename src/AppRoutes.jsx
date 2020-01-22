import HomePage from './HomePage';
import GeocoderPage from './GeocoderPage';

const AppRoutes = {
    HOME: { path: "/", component: GeocoderPage },
    GEOCODER: {
      path: "/geocoder",
      component: HomePage
    }
  };
  
  export default AppRoutes;