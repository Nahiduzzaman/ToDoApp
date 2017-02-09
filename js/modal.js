var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() { //save
	console.log('clicked');
    modal.style.display = "block";
    //modal.getElementsByTagName("SPAN")[0].style.visibility = 'visible'; //save
    //modal.getElementsByTagName("SPAN")[1].style.visibility = 'hidden'; //update
    modal.getElementsByTagName("SPAN")[0].style.display = 'unset'; //save
    modal.getElementsByTagName("SPAN")[1].style.display = 'none'; //update
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}