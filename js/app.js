var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
/*span.onclick = function() {
    modal.style.display = "none";
}*/

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//===============================================================
var task = {};
var todoData = [];
//function setters(){
	if(JSON.parse(localStorage.getItem("todos")) == null){
		var todos = [];
	}
	else{
		var todos = JSON.parse(localStorage.getItem("todos"));
	}
//}

//setters();


function cancel(){
	modal.style.display = "none";
}
function create() {
    if(JSON.parse(localStorage.getItem("todos")) == null){
		var todos = [];
	}
	else{
		var todos = JSON.parse(localStorage.getItem("todos"));
	}

	document.getElementById("main").innerHTML="";

	task = {
		created_at: new Date(),
		taskname: document.getElementById("taskname").value,
		description: document.getElementById("description").value,
		done: false
	}

	console.log('taskname',task.taskname);
	console.log('todos',todos);

	if(task.taskname != ""){
		todos.push(task);
		console.log('todos',todos);
		localStorage.setItem("todos", JSON.stringify(todos));
		localStorage.setItem("todoData", JSON.stringify(todos));
	}



	todoData = JSON.parse(localStorage.getItem("todoData"));
	console.log('todoData',JSON.stringify(todoData));

	for(var i = 0; i < todoData.length; i++) {
	  if(todoData[i].done){
	  	console.log('if')
	  	var card = document.createElement("div");
		card.className = "card";
		card.id = "task"+[i];
    	card.style.backgroundColor = '#ccc';
		//document.body.appendChild(card);
		document.getElementById("main").appendChild(card);

		var container = document.createElement("div");
		container.className = "container";
		container.innerHTML = '<h4><b><s>'+todoData[i].taskname+'</s></b><input '+
							  'type="checkbox" onChange="done(task'+[i]+', this,'+[i]+')" style="float: right;" checked><span onclick="remove('+[i]+')" style="float:right">&times;</span></h4>'+ 
	                          '<p>'+todoData[i].description+'</p>';
		card.appendChild(container);
	  }else{
	  	console.log('else');
		var card = document.createElement("div");
		card.className = "card";
		card.id = "task"+[i];
		//document.body.appendChild(card);
		document.getElementById("main").appendChild(card);

		var container = document.createElement("div");
		container.className = "container";
		container.innerHTML = '<h4><b>'+todoData[i].taskname+'</b><input '+
							  'type="checkbox" onChange="done(task'+[i]+', this,'+[i]+')" style="float: right;"><span onclick="remove('+[i]+')" style="float:right">&times;</span></h4>'+ 
	                          '<p>'+todoData[i].description+'</p>';
		card.appendChild(container);
	  }
	}

	modal.style.display = "none";
	
}

create();


function done(x, _this, task) {
  console.log(todoData[task]);
  if (_this.checked) {
  	todoData[task].done = true;
  	console.log(x.getElementsByTagName("B"));
  	x.getElementsByTagName("B")[0].style.textDecoration="line-through";
    x.style.backgroundColor = '#ccc';
  } else  {
  	todoData[task].done = false;
    x.style = '';
    x.getElementsByTagName("B")[0].style.textDecoration="";
  }
  localStorage.setItem("todos", JSON.stringify(todoData));
  localStorage.setItem("todoData", JSON.stringify(todoData));
  create();
  console.log('TodoData',todoData);
}

function remove(idx){
	console.log('idx',idx);
	todos.splice(idx,1);
	todoData.splice(idx, 1);
	localStorage.setItem("todos", JSON.stringify(todos));
	localStorage.setItem("todoData", JSON.stringify(todoData));
	create();
}
/*div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";*/

//document.getElementById("main").appendChild(div);

/*function create() {
       var mainContainer = document.createElement("div");
       mainContainer.id = "mainContainer";
       document.body.appendChild(mainContainer);
        
       for(var i = 0; i < 3; i++) {
           var divBlock = document.createElement("div");                
           divBlock.className = "blocks";
           divBlock.innerHTML = "Hello"
           mainContainer.appendChild(divBlock);       
       }
            
    }
 create();*/