const getLocalStorage = item => {
  const retrievedItem = JSON.parse(localStorage.getItem(item))

  if (!retrievedItem) return item === 'user' ? null : []
  return retrievedItem
}

const setLocalStorage = (name, items) => {
  localStorage.setItem(name, JSON.stringify(items))
}

const removeLocalStorage = item => {
  localStorage.removeItem(item)
}

export { getLocalStorage, setLocalStorage, removeLocalStorage }
