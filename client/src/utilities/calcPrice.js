export const calculatePrice = ({ exterior, wheels, interior, sound }) => {
  let total = 20000

  const exteriorPrices = {
    Red: 1000,
    Blue: 800,
    Black: 1200
  }

  const wheelsPrices = {
    Standard: 0,
    Sport: 1500,
    Premium: 2500
  }

  const interiorPrices = {
    Cloth: 0,
    Leather: 2000,
    Luxury: 3500
  }

  const soundPrices = {
    Basic: 0,
    Premium: 1200,
    Surround: 2200
  }

  total += exteriorPrices[exterior] || 0
  total += wheelsPrices[wheels] || 0
  total += interiorPrices[interior] || 0
  total += soundPrices[sound] || 0

  return total
}