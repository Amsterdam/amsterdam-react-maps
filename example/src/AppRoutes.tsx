// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteProps } from 'react-router-dom'
import BasicMap from './Pages/BasicMap'

const AppRoutes: { [key: string]: RouteProps } = {
  HOME: { path: '/', component: BasicMap, exact: true },
}

export default AppRoutes
