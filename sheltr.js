function createList(list_items) {
	var init = "<div>\
    						<div id='prep-list-1-close' onclick='closePrepList()' class='col-12'>close</div>\
    						<label class='container'>";
  var end = "</label>\
    								</div>";
  var middle = "";
  for (var i = 0; i < list_items.length; i++) {
  	middle = middle + "<div class='col-12'>" + list_items[i] + "<input type='checkbox' id=item" + i + " onclick='checkedItem()'>\
    										<span class='checkmark'></span>\
    										</div>"; 
  }
  /*console.log(middle)*/
  return init + middle + end;
}

$(document).ready(function() {

	sessionStorage.setItem('prep-card-1-count', 0);

	$("#prep-card-1").click(function(){
		var list = $("<div class='preparation-list-background'><div class='preparation-list'></div>");
    $("body").append(list);
    /*var content = $("<div>\
    									<div id='prep-list-1-close' onclick='closePrepList()' class='col-12'>close</div>\
    									<label class='container'>\
    										<div class='col-12'>Marina\
    										<input type='checkbox' id='item1' onclick='checkedItem()'>\
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
    								</div>");*/

    var content = createList(["Marina1", "Marina2", "Marina3"]);
    $(".preparation-list").append(content);

    if(sessionStorage.getItem('item0') == "true") {
	    document.getElementById("item0").checked = true;
	  }
	  else {
	  	document.getElementById("item0").checked = false;
	  }
	});

});




function checkedItem() {
	/*console.log("id")
	console.log(id)*/
	if(!(sessionStorage.getItem('item0'))){
		sessionStorage.setItem('item0', true);
    var count = sessionStorage.getItem('prep-card-1-count');
    sessionStorage.setItem('prep-card-1-count', count+1);
	}
	else {
		if(sessionStorage.getItem('item0') == "true") {
			sessionStorage.setItem('item0', false);
			var count = sessionStorage.getItem('prep-card-1-count');
			sessionStorage.setItem('prep-card-1-count', count-1);
		}
		else {
			sessionStorage.setItem('item0', true);
    	var count = sessionStorage.getItem('prep-card-1-count');
    	sessionStorage.setItem('prep-card-1-count', count+1);
		}
	}

}

function closePrepList() {
	$(".preparation-list-background").remove();
	document.getElementById("countdown-1").innerHTML = sessionStorage.getItem('prep-card-1-count') + " of 5";
}