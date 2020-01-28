/**
 * Defines a zoom visibility range for a layer
 */
export interface MinMax {
  min: number
  max: number
}

/**
 * Defines a general ActionType to be used with the reducers
 */
export interface ActionType<T> {
  type: string
  payload: T
}
