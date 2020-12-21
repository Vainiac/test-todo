
//Grabbing DOM elements
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const todosList = document.querySelector("#todos-list");

//Getting existing items in array from LS, but in the form of string.
//Using JSON.parse() to parse it. LS accepts key-value pairs in string form
const todos = JSON.parse(localStorage.getItem("todos"));

//Checking if LS is populated with todo items, and if yes, adding them to the list
if (todos) {
   todos.forEach(todo => {
      addTodo(todo);
   });
}

//Listening for a submit event in the form and adding todo list item
form.addEventListener("submit", (e) => {
   e.preventDefault();
   addTodo();
})

//Declaring the main function for adding todo items
function addTodo(todo){
   let todoText = input.value;

   if (todo){
      todoText = todo.text;
   }

   if (todoText) {
      //Creating a new todo element if there's todo text
      const todoEl = document.createElement("li"); 

      if (todo && todo.completed) {
         todoEl.classList.add("completed");
      }
      
      //setting the text of the new el to input text
      todoEl.innerText = todoText; 

      //adding the appropriate class to the element to get styled
      todoEl.classList.add("todo-item"); 

      //Placing it in the <ul>
      todosList.appendChild(todoEl); 
      
      //Adding the class for completed task
      todoEl.addEventListener("click", () => {
         todoEl.classList.toggle("completed");
         updateLS();
      })
      
      //Listening for right-click while preventing the menu to open (default behaviour), then removing the element
      todoEl.addEventListener("contextmenu", (e) => {
         e.preventDefault();
         todoEl.remove();
         updateLS();
      })
      
      //clearing the input
      input.value = "";

      //Updating Local Storage
      updateLS();
   }
}

//Declaring the function that updates the local storage
function updateLS() {

   //Getting all todo items that exist in the list (not in LS, but in the UI)
   //This gives a nodeList which can be looped through
   const allTodoItems = document.querySelectorAll(".todo-item");

   //Initializing the empty array which will receive the updated list items
   const todos = [];

   allTodoItems.forEach(todoItem => {
      todos.push({
         text: todoItem.innerText,
         completed: todoItem.classList.contains("completed")
      })
   })

   localStorage.setItem("todos", JSON.stringify(todos))
}