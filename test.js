let thElement = document.querySelector('th')
let tBodyElement = document.querySelector('tbody')

thElement.addEventListener("click", () => {
    let newRow = document.createElement('tr')
    let length = tBodyElement.rows.length + 1
    newRow.innerHTML = `<td>Row ${length}, Cell 1</td>\n<td>Row ${length}, Cell 2</td>\n<td>Row ${length}, Cell 3</td>`
    tBodyElement.appendChild(newRow)
})