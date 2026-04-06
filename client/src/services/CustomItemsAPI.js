const API_BASE = 'http://localhost:3001/api/custom-items'

export const getAllCustomItems = async () => {
  const response = await fetch(API_BASE)
  return response.json()
}

export const getCustomItem = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`)
  return response.json()
}

export const createCustomItem = async (itemData) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })

  return response.json()
}

export const updateCustomItem = async (id, itemData) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })

  return response.json()
}

export const deleteCustomItem = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  })

  return response.json()
}