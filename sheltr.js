$(document).ready(function() {

	sessionStorage.setItem('prep-card-1-count', 0);

	$("#prep-card-1").click(function(){
		var list = $("<div class='preparation-list-background'><div class='preparation-list'></div>");
    $("body").append(list);
    var content = $("<div>\
    									<div id='prep-list-1-close' onclick='closePrepList()' class='col-12'>close</div>\
    									<label class='container'>\
    										<div class='col-12'>Marina\
    										<input type='checkbox' id='item1' onclick='checkedItem1()'>\
    										<span class='checkmark'></span>\
    										</div>\
    										<div class='col-12'>Ketki\
    										<input type='checkbox'>\
    										<span class='checkmark'></span>\
    										</div>\
    										<div class='col-12'>Nish\
    										<input type='checkbox'>\
    										<span class='checkmark'></span>\
    										</div>\
    										<div class='col-12'>Brooke\
    										<input type='checkbox'>\
    										<span class='checkmark'></span>\
    										</div>\
    										<div class='col-12'>Jon\
    										<input type='checkbox'>\
    										<span class='checkmark'></span>\
    										</div>\
    									</label>\
    								</div>");
    $(".preparation-list").append(content);

    console.log("---")
    console.log(sessionStorage.getItem('item1'))

    if(sessionStorage.getItem('item1') == "true") {
    	console.log("**true")
    	/*var count = sessionStorage.getItem('prep-card-1-count');
    	sessionStorage.setItem('prep-card-1-count', count+1);*/
	    document.getElementById("item1").checked = true;
	  }
	  else {
	  	console.log("**false")
	  	/*console.log("unchecked")
	  	var count = sessionStorage.getItem('prep-card-1-count');
    	sessionStorage.setItem('prep-card-1-count', count-1);*/
	  	document.getElementById("item1").checked = false;
	  }
	});

});


function checkedItem1() {
	if(!(sessionStorage.getItem('item1'))){
		sessionStorage.setItem('item1', true);
		/*document.getElementById("item1").setAttribute('checked','checked');*/
    var count = sessionStorage.getItem('prep-card-1-count');
    sessionStorage.setItem('prep-card-1-count', count+1);
	}
	else {
		if(sessionStorage.getItem('item1') == "true") {
			sessionStorage.setItem('item1', false);
			/*document.getElementById("item1").setAttribute('checked','not checked');*/
			var count = sessionStorage.getItem('prep-card-1-count');
			sessionStorage.setItem('prep-card-1-count', count-1);
		}
		else {
			sessionStorage.setItem('item1', true);
			/*document.getElementById("item1").setAttribute('checked','checked');*/
    	var count = sessionStorage.getItem('prep-card-1-count');
    	sessionStorage.setItem('prep-card-1-count', count+1);
		}
	}

}

function closePrepList() {
	$(".preparation-list-background").remove();
	document.getElementById("countdown-1").innerHTML = sessionStorage.getItem('prep-card-1-count') + " of 5";
}