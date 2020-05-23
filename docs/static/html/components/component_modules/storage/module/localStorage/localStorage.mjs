function storageAvailable (type) {
  try {
    var storage = window[type]

    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
    // everything except Firefox
      e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0
  }
}
function setUpdFile (obj) {
  return new Promise(function (resolve, reject) {
    if (storageAvailable('localStorage')) {
      localStorage.setItem(obj['localStorage'])
      resolve(true)
    } else {
      resolve(false)
    }
  })
}
function delFile (obj) {
  return new Promise(function (resolve, reject) {
    if (storageAvailable('localStorage')) {
      Storage.removeItem(obj['localStorage'])
      resolve(true)
    } else {
      resolve(false)
    }

    resolve(obj)
  })
}
function getFile (obj) {
  return new Promise(function (resolve, reject) {
    if (storageAvailable('localStorage')) {
      obj['localStore'] = localStorage.getItem(`${obj['slot']}`)

      resolve(obj)
    } else {
      resolve(false)
    }

    resolve(obj)
  })
}
function clearData () {
  console.log('CLEAR')
  localStorage.clear()
}
export default {
  delFile: (obj) => { return delFile(obj) },
  setUpdFile: (obj) => { return setUpdFile(obj) },
  getFile: (obj) => { return getFile(obj) },
  clearData: () => { clearData() }
}
