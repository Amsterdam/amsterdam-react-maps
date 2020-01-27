// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteProps } from 'react-router-dom'
import BasicMap from './Pages/BasicMap'

export default {
  HOME: { path: '/', component: BasicMap, exact: true },
} as { [key: string]: RouteProps }
