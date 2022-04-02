
import { SERVER } from "../settings.js"
import { encode, handleHttpErrors } from "../utils.js"


// export async function loadAllQuotes() {
//   fetch(SERVER + "/api/quotes")
//     .then(res => {
//       if (!res.ok) {
//         throw new Error("Something went wrong")
//       }
//       return res.json()
//     })
//     .then(allQuotes => {
//       const rows = allQuotes.map(q => `
//   <tr>
//     <td>${encode(q.id)}</td>
//     <td>${encode(q.quote)}</td>
//     <td>${encode(q.ref)}</td>
//   </tr>
//   `).join("")
//       document.getElementById("table-body").innerHTML = rows;
//     })
//     .catch(e => alert(e.message))
// }

export async function loadAllQuotes() {
    try {
        const allQuotes = await fetch(SERVER + "/api/quotes")
            .then(res => handleHttpErrors(res))
            .then(allQuotes => {
                const rows = allQuotes.map(q => `
                  <tr>
                    <td>${encode(q.id)}</td>
                    <td>${encode(q.quote)}</td>
                    <td>${encode(q.ref)}</td>
                  </tr>
                  `).join("")

                document.getElementById("table-body").innerHTML = rows;
            })
        console.log(allQuotes)

    } catch (err) {
        console.error((err.message))
        if (err.apiError) {
            console.error("Full API error: ", err.apiError)
        }
    }
}
