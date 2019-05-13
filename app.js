//code likhna sa pahala apni demagh mai sochlo bhai krna kia 
//kia aek jagha likhlo req phir asani hogi.
//step:1 variable assign kro
var newTask = document.querySelector('#new-task');
var addTaskBtn = document.querySelector('#addTask');

var toDoUl = document.querySelector(".todo-list ul");
var completeUl =  document.querySelector(".complete-list ul");


// 2nd function create krna hai or kis ka krna hai.

//list item create krha ho jo tmhri req hai 
//is mai mre req kia hai aek checkbox or aek  label or sari chexn kis mai list mai 
// chaiya hain
var createNewTask = function(task){
  console.log("Creating task...");
  
  //SET UP THE NEW LIST ITEM
  var listItem = document.createElement("li"); //<li>
  var checkBox = document.createElement("input"); //checkbox
  var label = document.createElement("label"); // <label>
  
  
  //is step mai jo user na tmhra input kia hai use larha ho
  label.innerText = task;
  
  //PROPERTY KIA HAI KIA CHAHTA HO
  checkBox.type = "checkbox";
  
  //SARA TMHRA ITEM HAIN UNKO LIST MAI ADD KRO
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  //OR YAHN PAR SARI LIST KO RETURN KRADO
  return listItem;  
  
};

//ADD KRO SARA TODOS KO INCOMPLETE KI LIST MAI 
var addTask = function(){
  console.log("Adding task...");
  //BHAI SAFF SUTRA TAREQA SA UTHALO SARA INPUT  ITEM KO OR US KO ALAG SA VARIABLE MAI STORE KRLO 
  var listItem = createNewTask(newTask.value);
  //ADD THE NEW LIST ITEM TO LIST
  //SARA TODOS JO TM INPUT KRHA HO USE LIST MAI ADD KRLO
  toDoUl.appendChild(listItem); 
  //OR JO BHI INPUT KIA HAI USE CLEAR KRDO JAB ADD HJYE
  newTask.value="";
  
  //BIND THE NEW LIST ITEM TO THE INCOMPLETE LIST
  //YA TMLOG KA LIA NEW HOGA IS KO PARHLANA BIND KIUN KRTA HAIN HUM LOG 
  //MANA BHI ISE PARHA HAI NET SA
  //STEP:SARA JO TODOS JO INCOMPLETE HAIN IN KO SATH (bIND) RAKHO 
  bindIncompleteItems(listItem, completeTask);

};

var completeTask = function(){
  
  //GRAB  KARO  CHECKBOX'S KO  PARENT ELEMENT SA , JO JIS LI MAI MOJOOD HAIN
  var listItem = this.parentNode;
  
  //CREATE OR INSERT KROGA DELETE BUTTON KO 
  var deleteBtn = document.createElement("button"); // <button>
  deleteBtn.innerText ="Delete"; 
  deleteBtn.className = "delete";
  listItem.appendChild(deleteBtn);
  
  //SELECT THE CHECKBOX FROM THE COMPLETED CHECKBOX AND REMOVE IT
  //BHAI YA STEP SIMPLE YA KHERAHA HAI  select kro checkbox ko jo complete hain.
  //means marked hain
  var checkBox = listItem.querySelector("input[type=checkbox]");
  checkBox.remove();
  
  //phir un checkbox ko complte wali list mai lajao.
  completeUl.appendChild(listItem); 
  
  
  //phir sara complte item ko bind krka ka rakho jse humna incomplete ko kia thaw.

  bindCompleteItems(listItem, deleteTask);
  
};

//simple delete ka function hai 
var deleteTask = function(){
  console.log("Deleting task...");
  
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
  
};


//ab mna yhn pr wo function bnya hai jo sara elements ko bind kra hai 
//incomplete list ka 

var bindIncompleteItems = function(taskItem, checkBoxClick){  
  console.log("Binding the incomplete list...");
  
  
  //jo bind krha hai sara check box ko.
  var checkBox = taskItem.querySelector("input[type=checkbox]");
  
  //event listener lagya hai jab jab checkbox click hoga tou kia hoga.
  checkBox.onchange = checkBoxClick;  
}; 


// ya wo function hai jo complete list ko bind krha hai jse humna incomplete ka 
//bnya hai
var bindCompleteItems = function(taskItem, deleteButtonPress){
  console.log("Binding the complete list...");
  
  //ya kia krha sara delete button ko bind krha hai kiun humean complte ka sath aek button chaiya.

  
  var deleteButton = taskItem.querySelector(".delete");
   
  //jab delete button daboga tou delete task ka function call krlega
  deleteButton.onclick = deleteButtonPress;
    
};
//loop lagya hai repetion ka lia 

for(var i=0; i < toDoUl.children.length; i++) {
  bindIncompleteItems(toDoUl.children[i], completeTask);
}

for(var i=0; i < completeUl.children.length; i++) {
  bindCompleteItems(completeUl.children[i], deleteTask);
}


addTaskBtn.addEventListener("click", addTask);

