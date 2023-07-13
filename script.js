
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://items-store-d6c37-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListinDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButton =document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list") //This is ul elements ID

//Function to push input-element to the database(if it is not empty)
addButton.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    if (inputValue !== "") {
        push(shoppingListinDB, inputValue)
    }
    clearInputField()
    
})

//Function to output all the elements(key:value pair) present in the database to the website/app.
onValue(shoppingListinDB, function (snapshot) {
    if (snapshot.exists())
    {
        let itemArray = Object.entries(snapshot.val())

        clearShoppingList()
        for (let i = 0; i < itemArray.length; i++) {
            appendItemToShoppingList(itemArray[i])
        }

    }
    else {
        shoppingListEl.innerHTML="No Items..."
    }
    
    
})



function clearInputField() {
    inputFieldEl.value = ""
}
function clearShoppingList() {
    shoppingListEl.innerHTML=""
}
function appendItemToShoppingList(item) {

    //shoppingListEl.innerHTML += `<li>${item}</li>`

    let newEl = document.createElement("li")
    newEl.textContent = item[1]
    shoppingListEl.append(newEl)

    newEl.addEventListener("dblclick", function () {
        let elementToDelete = ref(database, `shoppingList/${item[0]}`)
        remove(elementToDelete)
    })

    
    
}