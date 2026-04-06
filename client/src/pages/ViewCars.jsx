import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllCars, deleteCar } from '../services/CarsAPI'

function ViewCars() {
  const [cars, setCars] = useState([])

  const loadCars = async () => {
    const data = await getAllCars()
    setCars(data)
  }

  const handleDelete = async (id) => {
    await deleteCar(id)
    loadCars()
  }

  useEffect(() => {
    loadCars()
  }, [])

  return (
    <div className="cars-page">
      <h1>DIY Delight Car Builder</h1>
      <Link to="/new">
        <button>Create New Car</button>
      </Link>

      {cars.length === 0 ? (
        <p>No custom cars yet.</p>
      ) : (
        <section className="car-list">
          {cars.map((car) => (
            <article key={car.id} className="car-card">
              <h2>{car.name}</h2>
              <p>Exterior: {car.exterior}</p>
              <p>Wheels: {car.wheels}</p>
              <p>Interior: {car.interior}</p>
              <p>Sound: {car.sound}</p>
              <p>Price: ${car.price}</p>

              <div className="car-card-actions">
                <Link to={`/cars/${car.id}`}>
                  <button>View Details</button>
                </Link>

                <Link to={`/edit/${car.id}`}>
                  <button>Edit</button>
                </Link>

                <button onClick={() => handleDelete(car.id)}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}

export default ViewCars