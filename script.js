const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"))

list.forEach(task=>{
  addToList(task);
})


formEl.addEventListener("submit" , (event)=>{
  event.preventDefault();
  addToList();
})

function addToList(task){

  let newTask = inputEl.value;

  if(task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li");

  if(task && task.checked){
    liEl.classList.add("checked")
  }
  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value="";

  // Buttons 

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fa-sharp fa-solid fa-square-check"></i>`
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fa-solid fa-trash"></i>`
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener("click" , ()=>{
    liEl.classList.toggle("checked");
    updateLocalStorage();
  })

  trashBtnEl.addEventListener("click" , ()=>{
    liEl.remove();
    updateLocalStorage();
  })

  updateLocalStorage();
}


function updateLocalStorage(){
  const liEls = document.querySelectorAll("li");
  list = [];

  liEls.forEach(liEl=>{
    list.push({
      name : liEl.innerText,
      checked : liEl.classList.contains("checked")
    })
  })
  localStorage.setItem("list", JSON.stringify(list))
}