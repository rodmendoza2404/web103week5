import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCarById, updateCar, deleteCar } from '../services/CarsAPI'
import { calculatePrice } from '../utilities/calcPrice'
import { validateCombination } from '../utilities/validateCombo'

function CarDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState(null)

  const getImageUrl = (exterior) => {
    if (exterior === 'Red') return '/car-red.png'
    if (exterior === 'Blue') return '/car-blue.png'
    if (exterior === 'Black') return '/car-black.png'
    return '/car-red.png'
  }

  useEffect(() => {
    const loadCar = async () => {
      const data = await getCarById(id)
      setFormData(data)
    }

    loadCar()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target

    const updatedData = {
      ...formData,
      [name]: value
    }

    updatedData.price = calculatePrice(updatedData)
    updatedData.image_url = getImageUrl(updatedData.exterior)

    setFormData(updatedData)
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationError = validateCombination(formData)

    if (validationError) {
      setError(validationError)
      return
    }

    try {
      await updateCar(id, formData)
      navigate(`/cars/${id}`)
    } catch (apiError) {
      setError(apiError.message)
    }
  }

  const handleDelete = async () => {
    await deleteCar(id)
    navigate('/')
  }

  if (!formData) return <p>Loading...</p>

  return (
    <div>
      <h1>Car Details</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Exterior</label>
        <select name="exterior" value={formData.exterior} onChange={handleChange}>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
        </select>

        <label>Wheels</label>
        <select name="wheels" value={formData.wheels} onChange={handleChange}>
          <option value="Standard">Standard</option>
          <option value="Sport">Sport</option>
          <option value="Premium">Premium</option>
        </select>

        <label>Interior</label>
        <select name="interior" value={formData.interior} onChange={handleChange}>
          <option value="Cloth">Cloth</option>
          <option value="Leather">Leather</option>
          <option value="Luxury">Luxury</option>
        </select>

        <label>Sound</label>
        <select name="sound" value={formData.sound} onChange={handleChange}>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
          <option value="Surround">Surround</option>
        </select>

        <p>Total Price: ${formData.price}</p>

        <img src={formData.image_url} alt={formData.name} width="250" />

        {error && <p>{error}</p>}

        <button type="submit">Update Car</button>
        <button type="button" onClick={handleDelete}>Delete Car</button>
      </form>
    </div>
  )
}

export default CarDetails