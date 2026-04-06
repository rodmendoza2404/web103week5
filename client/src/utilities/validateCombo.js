export const validateCombination = ({ exterior, wheels, interior, sound }) => {
  if (wheels === 'Premium' && interior === 'Cloth') {
    return 'Premium wheels cannot be combined with Cloth interior.'
  }

  if (sound === 'Surround' && interior === 'Cloth') {
    return 'Surround sound requires Leather or Luxury interior.'
  }

  if (exterior === 'Red' && wheels === 'Standard') {
    return 'Red exterior must use Sport or Premium wheels.'
  }

  return ''
}