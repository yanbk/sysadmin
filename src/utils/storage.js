export function getStorage(key) {
  return window.localStorage.getItem(key)
}

export function setStorage(key, val) {
  return window.localStorage.setItem(key, val, { expires: 365 })
}

export function removeStorage(key) {
  return window.localStorage.removeItem(key)
}
