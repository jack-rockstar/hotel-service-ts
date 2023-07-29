import { StatusRental } from "./validation/rental.dto"

export const getDescriptionById = (id: string): string => {
  const description = Object.keys(StatusRental) as (keyof typeof StatusRental)[]
  const data = description.find((key) => StatusRental[key] === id)
  return data ?? ''
}