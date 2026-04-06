const API_BASE = 'http://localhost:3000/api/custom-items'

const parseJsonSafely = async (response) => {
  try {
    return await response.json()
  } catch {
    return null
  }
}

const handleResponse = async (response, fallbackMessage) => {
  const payload = await parseJsonSafely(response)

  if (!response.ok) {
    const message = payload?.error || fallbackMessage
    throw new Error(message)
  }

  return payload
}

export const getAllCars = async () => {
  const response = await fetch(API_BASE)
  return handleResponse(response, 'Failed to fetch cars.')
}

export const getCarById = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`)
  return handleResponse(response, 'Failed to fetch car details.')
}

export const createCar = async (carData) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carData)
  })
  return handleResponse(response, 'Failed to create car.')
}

export const updateCar = async (id, carData) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(carData)
  })
  return handleResponse(response, 'Failed to update car.')
}

export const deleteCar = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  })
  return handleResponse(response, 'Failed to delete car.')
}