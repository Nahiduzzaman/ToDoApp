var modal = document.getElementById('myModal');


var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// editbtn.onclick = function() {
// 	console.log('clickededit');
//     modal.style.display = "block";
// }

btn.onclick = function() {
	console.log('clicked');
    modal.style.display = "block";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//===============================================================
var task = {};
var todoData = [];
var data = [];
var searchText = '';



if(JSON.parse(localStorage.getItem("todos")) == null){
	var todos = [];
}
else{
	var todos = JSON.parse(localStorage.getItem("todos"));
}

function searchTodo(text){
	var searchText = text.value;
	console.log('searchText',searchText);
	create(undefined,undefined,searchText);
}

function filter(selection){
	console.log('selection',selection.value);

	var flag = 'filter';
	create(selection.value,flag);
}

function cancel(){
	modal.style.display = "none";
}

function trimString(s) {
  var l=0, r=s.length -1;
  while(l < s.length && s[l] == ' ') l++;
  while(r > l && s[r] == ' ') r-=1;
  return s.substring(l, r+1);
}

function compareObjects(o1, o2) {
  var k = '';
  for(k in o1) if(o1[k] != o2[k]) return false;
  for(k in o2) if(o1[k] != o2[k]) return false;
  return true;
}

function itemExists(haystack, needle) {
  for(var i=0; i<haystack.length; i++) if(compareObjects(haystack[i], needle)) return true;
  return false;
}

function create(status,isfilter,searchText) {

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

	//console.log('taskname',task.taskname);
	//console.log('todos',todos);

	//console.log(status);
	if(isfilter){
		console.log('omg');
	}
	else{
	    //console.log('yess');
		if(task.taskname != ""){
			todos.push(task);
			console.log('todos',todos);
			localStorage.setItem("todos", JSON.stringify(todos));
			localStorage.setItem("todoData", JSON.stringify(todos));
		}
	}


    
	todoData = JSON.parse(localStorage.getItem("todoData"));
	//console.log('todoData',JSON.stringify(todoData));
    
    if(status == 'done'){
    	var completedData = [];
	    for(var i = 0; i < todoData.length; i++) {
	    	if(todoData[i].done == true){
	    		completedData.push(todoData[i]);
	    	}
	    }

	    console.log('completedData',completedData);
	    data = completedData;
	}

	else if(status == 'pending'){
    	var pendingData = [];
	    for(var i = 0; i < todoData.length; i++) {
	    	if(todoData[i].done == false){
	    		pendingData.push(todoData[i]);
	    	}
	    }

	    console.log('pendingData',pendingData);
	    data = pendingData;
	}	

	else{
    	data = todoData;
	}

	/*if(searchText){
		console.log('searchText in create()',searchText);
		console.log('searchText in TodoData',todoData);
	    var results = [];
		for(var i=0; i<todoData.length; i++) {
		  for(var key in todoData[i]) {
		    //console.log('key',key)
		    if(typeof todoData[i][key] === 'string' && todoData[i][key].toLowerCase().indexOf(trimString(searchText).toLowerCase())!=-1) {
		      results.push(todoData[i]);
		    }
		  }
		}
		  toSearch = trimString(searchText).toLowerCase(); // trim it
		  for(var i=0; i<todoData.length; i++) {
		    for(var key in todoData[i]) {
		      if(typeof todoData[i][key] === 'string' && todoData[i][key].toLowerCase().indexOf(toSearch)!=-1) {
		        if(!itemExists(results, todoData[i])) results.push(todoData[i]);
		      }
		    }
		  }
        console.log('results',results)
		todoData = results;
    }*/
    console.log('data',data);
    data = sortbytitle(data);
    console.log('data',data);
    console.log('todoData',todoData);
    
	for(var i = 0; i < data.length; i++) {
	  if(data[i].done){
	  	console.log('if')
	  	var list = document.createElement("li");
	  	
	  	var outerdiv = document.createElement("div");
	  	outerdiv.style.display = "inline";
	  	outerdiv.innerHTML = '<div class="taskimg">'+
               					'<img class="img_resize" tabindex="1" src="css/images/todo.png" alt="todo_logo">'+
            				  '</div>';

	  	var card = document.createElement("div");
		card.className = "card";
		card.id = "task"+[i];
    	card.style.backgroundColor = '#bfbfbf';

		var container = document.createElement("div");
		container.className = "container";
		var editId = "editBtn"+i;
		container.innerHTML = '<h4><b>'+data[i].taskname+'</b><input '+
							  'type="checkbox" onChange="done(task'+[i]+', this,'+[i]+')" style="float: right;" checked>'+
							  '<span onclick="remove('+[i]+')" style="float:right;cursor:pointer;margin-right: 10px" disabled>&times;</span>'+
							  '<a id="editId" style="float:right;cursor:pointer;margin-right: 10px">Edit</a></h4>'+ 
	                          '<p>'+data[i].description+'</p>';
	    container.getElementsByTagName("B")[0].style.textDecoration="line-through";

	    outerdiv.appendChild(card);
		card.appendChild(container);
		list.appendChild(outerdiv);

		console.log('list',list);
		document.getElementById("main").appendChild(list);
		editbtn = document.getElementById("editId");

	  }else{
		var list = document.createElement("li");

	  	var outerdiv = document.createElement("div");
	  	outerdiv.style.display = "inline";
	  	outerdiv.innerHTML = '<div class="taskimg">'+
               					'<img class="img_resize" tabindex="1" src="css/images/todo.png" alt="todo_logo">'+
            				  '</div>';

	  	var card = document.createElement("div");
		card.className = "card";
		card.id = "task"+[i];

		var container = document.createElement("div");
		container.className = "container";
		container.innerHTML = '<h4><b>'+data[i].taskname+'</b><input '+
							  'type="checkbox" onChange="done(task'+[i]+', this,'+[i]+')" style="float: right;">'+
							  '<span onclick="remove('+[i]+')" style="float:right;cursor:pointer;margin-right: 10px">&times;</span>'+
							  '<a id="editBtn'+[i]+'" onclick="editOnClick('+[i]+')" style="float:right;cursor:pointer;margin-right: 10px">Edit</a></h4>'+ 
	                          '<p>'+data[i].description+'</p>';
		
		outerdiv.appendChild(card);
		card.appendChild(container);
		list.appendChild(outerdiv);

		console.log('list',list);
		document.getElementById("main").appendChild(list);
	  }
	}

	modal.style.display = "none";
	
}

//create();



function done(x, _this, task) {
  //console.log('x',x);
  //console.log(todoData[task]);
  if (_this.checked) {
  	todoData[task].done = true;
  	//console.log(x.getElementsByTagName("B"));
  	x.getElementsByTagName("B")[0].style.textDecoration="line-through";
    x.style.backgroundColor = '#bfbfbf';
    //x.style.boxShadow='-2px -3px 8px 0 rgba(0,0,0,0.2);transition: 0.3s';
  } else  {
  	todoData[task].done = false;
    x.style = '';
    x.getElementsByTagName("B")[0].style.textDecoration="";
  }
  localStorage.setItem("todos", JSON.stringify(todoData));
  localStorage.setItem("todoData", JSON.stringify(todoData));
  //create();
  console.log('TodoData after done or undone',todoData);
}

function remove(idx){
	console.log('idx',idx);
	console.log('todos-before',todos)
	todos.splice(idx,1);
	console.log('todos',todos)
	todoData.splice(idx, 1);
	localStorage.setItem("todos", JSON.stringify(todos));
	localStorage.setItem("todoData", JSON.stringify(todoData));
	create(undefined,true,undefined);
}

function sortbytitle(data){
	console.log('data for sort',data)
	data.sort(function(a, b) {
	  var titleA = a.taskname.toUpperCase(); // ignore upper and lowercase
	  var titleB = b.taskname.toUpperCase(); // ignore upper and lowercase
	  if (titleA < titleB) {
	    return -1;
	  }
	  if (titleA > titleB) {
	    return 1;
	  }
	  return 0;
	});
    console.log('data after sort',data);
    return data;

}
var index;
function editOnClick(id){
	console.log('edit_id',id);
	console.log('taskname',todoData[id].taskname );
	console.log('taskDesc',todoData[id].description );
	modal.style.display = "block";
	modal.getElementsByTagName("INPUT")[0].value = todoData[id].taskname;
	modal.getElementsByTagName("TEXTAREA")[0].value = todoData[id].description;
	modal.getElementsByTagName("SPAN")[0].style.display = "none";
	index = id;
	console.log(index);
	
}

function update(){
	console.log(index);
	todoData[index].taskname = modal.getElementsByTagName("INPUT")[0].value;
	todoData[index].description = modal.getElementsByTagName("TEXTAREA")[0].value;
	localStorage.setItem("todoData", JSON.stringify(todoData));
	console.log(JSON.parse(localStorage.getItem("todoData")));

	//data.splice(2, 1, "Lemon");
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