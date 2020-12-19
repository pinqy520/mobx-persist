export function clear() {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.clear()
      resolve(null)
    } catch (err) {
      reject(err)
    }
  })
}

export function getItem(key: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    try {
      const value = window.localStorage.getItem(key)
      resolve(value)
    } catch (err) {
      reject(err)
    }
  })
}

export function removeItem(key: string) {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.removeItem(key)
      resolve(null)
    } catch (err) {
      reject(err)
    }
  })
}


export function setItem(key: string, value: string) {
  return new Promise((resolve, reject) => {
    try {
      window.localStorage.setItem(key, value)
      resolve(null)
    } catch (err) {
      reject(err)
    }
  })
}

export interface IStorage {
  getItem(key: string): Promise<string>
  removeItem(key: string): Promise<void>
  setItem(key: string, value: string): Promise<void>
  [key: string]: any
}