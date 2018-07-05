function createList(list_items) {
	var init = "<div>\
    						<div id='prep-list-1-close' onclick='closePrepList()' class='col-12'>close</div>\
    						<label class='container'>";
  var end = "</label>\
    								</div>";
  var middle = "";
  for (var i = 0; i < list_items.length; i++) {
  	middle = middle + "<div class='col-12'>" + list_items[i] + "<input type='checkbox' id=item" + i + " onclick='checkedItem(this.id)'>\
    										<span class='checkmark'></span>\
    										</div>"; 
  }
  return init + middle + end;
}

$(document).ready(function() {

	sessionStorage.setItem('prep-card-1-count', 0);

	/* click on emergency contact list card */
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

    var items_list = ["Marina1", "Marina2", "Marina3"];
    var content = createList(items_list);
    $(".preparation-list").append(content);

    /*if(sessionStorage.getItem('item0') == "true") {
	    document.getElementById("item0").checked = true;
	  }
	  else {
	  	document.getElementById("item0").checked = false;
	  }*/
	  for (var i = 0; i < items_list.length; i++) {
	  	loadCheckedItem("item"+i)
	  }
	});

});

function loadCheckedItem(id) {
  if(sessionStorage.getItem(id) == "true") {
	  document.getElementById(id).checked = true;
	}
	else {
	  document.getElementById(id).checked = false;
	}
}


function checkedItem(id) {
	if(!(sessionStorage.getItem(id))){
		sessionStorage.setItem(id, true);
    var count = parseInt(sessionStorage.getItem('prep-card-1-count'));
    sessionStorage.setItem('prep-card-1-count', count+1);
	}
	else {
		if(sessionStorage.getItem(id) == "true") {
			sessionStorage.setItem(id, false);
			var count = sessionStorage.getItem('prep-card-1-count');
			sessionStorage.setItem('prep-card-1-count', count-1);
		}
		else {
			sessionStorage.setItem(id, true);
    	var count = parseInt(sessionStorage.getItem('prep-card-1-count'));
    	sessionStorage.setItem('prep-card-1-count', count+1);
		}
	}

}

function closePrepList() {
	$(".preparation-list-background").remove();
	console.log(sessionStorage.getItem('prep-card-1-count'))
	document.getElementById("countdown-1").innerHTML = sessionStorage.getItem('prep-card-1-count') + " of 5";
}