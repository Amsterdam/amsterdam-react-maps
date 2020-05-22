import React from 'react'
import { NavLink } from 'react-router-dom'

const PAGES = [
  {
    to: '/map-layers',
    title: 'Map Layers',
    description: '(Prototype*) Toggle map layers',
  },
  {
    to: '/point-click',
    title: 'Point click',
    description: '(Prototype*) Get addresses by clicking on the map.',
  },
  {
    to: '/map-base-layers',
    title: 'Map Base Layers',
    description:
      '(Prototype*) Select a baselayer variant (like map / aerial views)',
  },
  {
    to: '/draw',
    title: 'Drawing',
    description:
      '(Prototype*) An example of fetching results by drawing a polygon on a map',
  },
  {
    to: '/marker-clustering',
    title: 'Marker Clustering',
    description: '(Prototype*) Marker clustering',
  },
]

const IndexPage: React.FC = () => (
  <>
    <ul>
      {PAGES.map(({ to, title, description }) => (
        <li key={to}>
          <NavLink to={to}>{title}</NavLink>
          <p>{description}</p>
        </li>
      ))}
    </ul>
    <p>
      <strong>*</strong>Not styled and not ready to use in production yet
    </p>
  </>
)

export default IndexPage
