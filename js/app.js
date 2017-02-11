//var task = {};
var data = [];
if(JSON.parse(localStorage.getItem("todoData")) == null){
	var todoData = [];
}
else{
	var todoData = JSON.parse(localStorage.getItem("todoData"));
}

function searchTodo(text){
    document.getElementById("main").innerHTML="";	
	console.log('searchText',text);
	console.log('todoData in searchTodo',todoData);
    var forsearch = todoData;
	for(var i = 0; i < forsearch.length; i++){
		forsearch[i].s_id = i;
	}
	function filterItems(query) {
	    return forsearch.filter(function(el) {
	     return el.taskname.toLowerCase().indexOf(query.toLowerCase()) > -1 || el.description.toLowerCase().indexOf(query.toLowerCase()) > -1 ;
	    })
	}
	var searchedData = filterItems(text);
	console.log('searchedData',searchedData)
	for(var j=0;j < searchedData.length;j++){
		createlist(searchedData[j].s_id);
	}
}


function createTask(){
	var task = {
		created_at: new Date(),
		taskname: document.getElementById("taskname").value,
		description: document.getElementById("description").value,
		done: false
	}

    //console.log('todoData_length',todoData.length);

	if(task.taskname == ""){
	   	alert("Please enter task name!");
	}
	else if(task.description == ""){
	   	alert("Please enter task description!")
	}
	else{
		todoData.push(task);
		console.log('todoData',todoData);
		localStorage.setItem("todoData", JSON.stringify(todoData));
	}

	modal.style.display = "none";
	flterAndRender('all')
}

function flterAndRender(status) {
	console.log(status);
	document.getElementById("main").innerHTML="";
	//todoData = JSON.parse(localStorage.getItem("todoData"));
    if(status == 'done'){
	    for(var i = 0; i < todoData.length; i++) {
	    	if(todoData[i].done == true){
	    		createlist(i);
	    	}
	    }    
	}
	else if(status == 'pending'){
	    for(var i = 0; i < todoData.length; i++) {
	    	if(todoData[i].done == false){
	    		createlist(i);
	    	}
	    }
	}	
	else{
    	data = todoData;
    	sortbytitle(data);
    	for(var i = 0; i < data.length; i++) {
	    	createlist(i);	    	
	    }
	}
	//console.log('searchText',searchText);

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
		data = results;
		for(var i = 0; i < data.length; i++) {
	    	createlist(i);	    	
	    }
    }*/
	
}

function createlist(i){
	var list = document.createElement("li");
	list.id = "list"+i;

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

    if(data[i].done == true){
		card.style.backgroundColor = '#bfbfbf';
		container.getElementsByTagName("B")[0].style.textDecoration="line-through";
	}
	
	outerdiv.appendChild(card);
	card.appendChild(container);
	list.appendChild(outerdiv);

	console.log('list',list);
	document.getElementById("main").appendChild(list);
}

function done(x, _this, task) {
  if (_this.checked) {
  	todoData[task].done = true;
  	x.getElementsByTagName("B")[0].style.textDecoration="line-through";
    x.style.backgroundColor = '#bfbfbf';
  } else  {
  	todoData[task].done = false;
    x.style = '';
    x.getElementsByTagName("B")[0].style.textDecoration="";
  }
  //localStorage.setItem("todos", JSON.stringify(todoData));
  localStorage.setItem("todoData", JSON.stringify(todoData));
  console.log('TodoData after done or undone',todoData);
}

function remove(idx){
	console.log('idx',idx);
	todoData.splice(idx, 1);
	var idtodelete = 'list'+idx;
	document.getElementById(idtodelete).remove();
	localStorage.setItem("todoData", JSON.stringify(todoData));
}

function sortbytitle(data){
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
    return data;
}

var index;
function editOnClick(id){
	console.log('edit_id',id);
	console.log('todoData in edit',todoData)
	console.log('taskname',todoData[id].taskname );
	console.log('taskDesc',todoData[id].description );
	modal.style.display = "block";
	modal.getElementsByTagName("INPUT")[0].value = todoData[id].taskname;
	modal.getElementsByTagName("TEXTAREA")[0].value = todoData[id].description;
    modal.getElementsByTagName("SPAN")[0].style.display = 'none'; //save
    modal.getElementsByTagName("SPAN")[1].style.display = 'unset'; //update
	index = id;
	console.log(index);	
}

function update(){
	console.log(index);
	todoData[index].taskname = modal.getElementsByTagName("INPUT")[0].value;
	todoData[index].description = modal.getElementsByTagName("TEXTAREA")[0].value;
	localStorage.setItem("todoData", JSON.stringify(todoData));
	console.log(JSON.parse(localStorage.getItem("todoData")));
	modal.style.display = "none";
	window.location.reload();
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



