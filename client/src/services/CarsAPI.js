const API_BASE = 'http://localhost:3000/api/custom-items'

export const getAllCars = async () => {
  const response = await fetch(API_BASE)
  return response.json()
}

export const getCarById = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`)
  return response.json()
}

export const createCar = async (carData) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carData)
  })
  return response.json()
}

export const updateCar = async (id, carData) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carData)
  })
  return response.json()
}

export const deleteCar = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  })
  return response.json()
}