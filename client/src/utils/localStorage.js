const getLocalStorage = item => {
  const cart = JSON.parse(localStorage.getItem(item))

  if (!cart) return []
  return cart
}

const setLocalStorage = (name, items) => {
  localStorage.setItem(name, JSON.stringify(items))
}

export { getLocalStorage, setLocalStorage }
