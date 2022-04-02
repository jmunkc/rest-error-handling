import { SERVER } from "../settings.js"
import {handleHttpErrors, makeOptions} from "../utils.js";

const SERVER_URL = SERVER + "/api/quotes"

export function page4Handlers() {
  document.getElementById("btn-find").onclick = findQuote
  document.getElementById("btn-edit").onclick = editQuote
  document.getElementById("btn-delete").onclick = deleteQuote
}


async function findQuote() {
  const id = getIdFromInputField()
  try {
    await fetch(`${SERVER_URL}/${id}`)
        .then(handleHttpErrors)
        .then(foundQuote => {
          document.getElementById("quote").value = foundQuote.quote
          document.getElementById("author").value = foundQuote.ref
        })
  } catch (e) {
    console.error((err.message))
    if (err.apiError) {
      console.error("Full API error: ", err.apiError)
    }
  }
}

async function editQuote() {
  const id = getIdFromInputField()
  const editedQuote = {
    id: id
  }
  editedQuote.quote = document.getElementById("quote").value
  editedQuote.ref = document.getElementById("author").value
  const options = makeOptions("PUT", editedQuote)

  try {
    await fetch(SERVER_URL + "/" + id, options)
        .then(handleHttpErrors)
        .then(result => clearFields())
  } catch {
    console.error((err.message))
    if (err.apiError) {
      console.error("Full API error: ", err.apiError)
    }
  }
}

async function deleteQuote() {
  const id = getIdFromInputField()
  await fetch(SERVER_URL + "/" + id, {
    method: "DELETE"
  }).then(res => {
    handleHttpErrors(res)
  })
  clearFields()
}

// function findQuote() {
//   const id = getIdFromInputField()
//   fetch(`${SERVER_URL}/${id}`)
//     .then(res => {
//       if (!res.ok) {
//         throw new Error("Could not find quote (")
//       }
//       return res.json()
//     })
//     .then(foundQuote => {
//       document.getElementById("quote").value = foundQuote.quote
//       document.getElementById("author").value = foundQuote.ref
//     })
//     .catch(e => alert(e.message + " (NEVER use alerts for real)"))
// }

// function editQuote() {
//   const id = getIdFromInputField()
//   const editedQuote = {
//     id: id
//   }
//   editedQuote.quote = document.getElementById("quote").value
//   editedQuote.ref = document.getElementById("author").value
//
//   fetch(SERVER_URL + "/" + id, {
//     method: "PUT",
//     headers: {
//       "Accept": "application/json",
//       "Content-type": "application/json"
//     },
//     body: JSON.stringify(editedQuote)
//   })
//     .then(res => {
//       if (!res.ok) {
//         throw new Error("Error while editing the quote")
//       }
//       return res.json()
//     })
//     .then(result => clearFields())
//     .catch(err => alert(err.message + " (NEVER USE ALERT FOR REAL)"))
// }

// async function deleteQuote() {
//   const id = getIdFromInputField()
//   await fetch(SERVER_URL + "/" + id, {
//     method: "DELETE"
//   }).then(res => {
//     res.text()
//   })
//   clearFields()
// }

function clearFields() {
  document.getElementById("quote-id").value = ""
  document.getElementById("quote").value = ""
  document.getElementById("author").value = ""
}

function getIdFromInputField() {
  const id = document.getElementById("quote-id").value
  if (id === "") {
    throw new Error("No ID Provided")
  }
  return id
}
