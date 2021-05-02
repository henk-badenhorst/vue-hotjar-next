
import { hotjarOptions } from '../../types/typing'

// Validate HotJar ID
export function id(id: any): Promise<string> {
  return new Promise((resolve, reject) => {
      if (!id) {
        reject('Hotjar Tracking ID is not defined')
      } else if (typeof id !== 'number') {
        reject(`Hotjar option site id is of type ${typeof id} and should a number`)
      } else {
        resolve('valid')
      }
  })
}

// Validate isProduction
export function isProduction(isProduction: any): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof isProduction !== ('boolean' || 'undefined')) {
      reject(`Hotjar option isProduction is of type ${typeof isProduction} and should a boolean`)
    } else {
      resolve('valid')
    }
  })
}

// Validate snippetVersion
export function snippetVersion(snippetVersion: any): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof snippetVersion !== 'number') {
      reject(`Hotjar option snippetVersion is of type ${typeof snippetVersion} and should a number`)
    } else {
      resolve('valid')
    }
  })
}

export function validateHotjarOptions(options: hotjarOptions): Promise<boolean> {
  return new Promise((resolve, reject) => {
    Promise.all([id(options.id), isProduction(options.isProduction)]).then(() => {
      resolve(true)
    }).catch((error) => {
      console.error(error)
      reject(false)
    })
  })
}