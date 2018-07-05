$(document).ready(function() {

	sessionStorage.setItem('prep-card-1-count', 0);
	sessionStorage.setItem('prep-card-2-count', 0);
	sessionStorage.setItem('prep-card-3-count', 0);
	sessionStorage.setItem('prep-card-4-count', 0);
	sessionStorage.setItem('prep-card-5-count', 0);
	sessionStorage.setItem('prep-card-6-count', 0);

	var items_list_card_1 = ["Marina1", "Marina2", "Marina3"];
	var items_list_card_2 = ["Brazil", "USA", "India", "England"];
	var items_list_card_3 = ["Ketki", "Nishchala", "Brooke", "Marina", "Jon"];
	document.getElementById("countdown-1").innerHTML = sessionStorage.getItem('prep-card-1-count') + " of " + items_list_card_1.length;
	document.getElementById("countdown-2").innerHTML = sessionStorage.getItem('prep-card-2-count') + " of " + items_list_card_2.length;
	document.getElementById("countdown-3").innerHTML = sessionStorage.getItem('prep-card-3-count') + " of " + items_list_card_3.length;

	/* Emergency contact card */
	$("#prep-card-1").click(function(){
		var list = $("<div class='preparation-list-background'><div class='preparation-list'></div>");
    $("body").append(list);
    var content = createList(items_list_card_1, this.id);
    $(".preparation-list").append(content);

	  for (var i = 0; i < items_list_card_1.length; i++) {
	  	loadCheckedItem("item"+i+"-"+this.id)
	  }
	});

	/* Emergency kit card */
	$("#prep-card-2").click(function(){
		var list = $("<div class='preparation-list-background'><div class='preparation-list'></div>");
    $("body").append(list);
    var content = createList(items_list_card_2, this.id);
    $(".preparation-list").append(content);

	  for (var i = 0; i < items_list_card_2.length; i++) {
	  	loadCheckedItem("item"+i+"-"+this.id)
	  }
  });

  /* Shelter registrations card */
	$("#prep-card-3").click(function(){
		var list = $("<div class='preparation-list-background'><div class='preparation-list'></div>");
    $("body").append(list);
    var content = createList(items_list_card_3, this.id);
    $(".preparation-list").append(content);

	  for (var i = 0; i < items_list_card_3.length; i++) {
	  	loadCheckedItem("item"+i+"-"+this.id)
	  }
  });

});

function checkedItem(id) {
	var item = id.split('-')[0] + "-";
	var card = id.split(item)[1] + "-count";

	if(!(sessionStorage.getItem(id))){
		sessionStorage.setItem(id, true);
    var count = parseInt(sessionStorage.getItem(card));
    sessionStorage.setItem(card, count+1);
	}
	else {
		if(sessionStorage.getItem(id) == "true") {
			sessionStorage.setItem(id, false);
			var count = sessionStorage.getItem(card);
			sessionStorage.setItem(card, count-1);
		}
		else {
			sessionStorage.setItem(id, true);
    	var count = parseInt(sessionStorage.getItem(card));
    	sessionStorage.setItem(card, count+1);
		}
	}

}

function closePrepList(id) {
	$(".preparation-list-background").remove();
	var card_number = (id.split('-')[3])
	var item = id.split('-')[0] + "-";
	var card = id.split(item)[1] + "-count";
	var countdown = "countdown-" + card_number;
	var total_items = (document.getElementById(countdown).innerHTML).split(" ")[2];
	document.getElementById(countdown).innerHTML = sessionStorage.getItem(card) + " of " + total_items;
}

function createList(list_items, card_id) {
	var init = "<div>\
    						<div id='close-" + card_id + "' onclick='closePrepList(this.id)' class='col-12'>close</div>\
    						<label class='container'>";
  var end = "</label>\
    								</div>";
  var middle = "";
  for (var i = 0; i < list_items.length; i++) {
  	middle = middle + "<div class='col-12'>" + list_items[i] + "<input type='checkbox' id=item" + i + "-" + card_id + " onclick='checkedItem(this.id)'>\
    										<span class='checkmark'></span>\
    										</div>"; 
  }
  return init + middle + end;
}

function loadCheckedItem(id) {
  if(sessionStorage.getItem(id) == "true") {
	  document.getElementById(id).checked = true;
	}
	else {
	  document.getElementById(id).checked = false;
	}
}
