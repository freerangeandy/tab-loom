const checkResponse = (response) => {
  if (response.ok) {
    return response
  } else {
    let errorMessage = `${response.status} (${response.statusText})`
    let error = new Error(errorMessage)
    throw(error)
  }
}
const logFetchError = (error) => console.error(`Error in fetch: ${error.message}`)

export const fetchUser = (successCallback) => {
  fetch("/api/v1/users/:id.json")
  .then(checkResponse)
  .then(response => response.json())
  .then(successCallback)
  .catch(logFetchError)
}

export const fetchSaveTab = (successCallback, tabPayload, method, pathSuffix = "") => {
  fetch(`/api/v1/tablatures${pathSuffix}`, {
    credentials: "same-origin",
    method: method,
    body: JSON.stringify(tabPayload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse)
  .then(response => response.json())
  .then(successCallback)
  .catch(logFetchError)
}

export const fetchDeleteTabByIndex = (successCallback, tabList) => (deleteIndex) => {
  const deleteId = tabList[deleteIndex].id
  fetch(`/api/v1/tablatures/${deleteId}`, {
    credentials: "same-origin",
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(checkResponse)
  .then(response => response.json())
  .then(successCallback(deleteIndex))
  .catch(logFetchError)
}

export const fetchChordList = (successCallback) => () => {
  fetch(`/api/v1/chords.json`)
  .then(checkResponse)
  .then((response) => response.json())
  .then(successCallback)
  .catch(logFetchError)
}
