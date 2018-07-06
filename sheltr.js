$(document).ready(function() {

	sessionStorage.setItem('total_checked', 0);

	var card_lists = [["Marina1", "Marina2", "Marina3"],
									["Brazil", "USA", "India", "England"],
									["Ketki", "Nishchala", "Brooke", "Marina", "Jon", "Jerek"],
									["Lala", "Lele"],
									["Hi"],
									["Purple", "Blue", "Orange", "Yellow"]];

	var total_items = 0;

	for (var i=1; i<=card_lists.length; i++) {
		var countdown = "countdown-" + i;
		var prep_card = 'prep-card-' + i + '-count';
		sessionStorage.setItem(prep_card, 0);
		document.getElementById(countdown).innerHTML = sessionStorage.getItem(prep_card) + " of " + (card_lists[i-1]).length;
		total_items += (card_lists[i-1]).length;
	}

	/* Emergency contact card */
	$("#prep-card-1").click(function(){
		loadList(this.id, card_lists[0], total_items);
	});

	/* Emergency kit card */
	$("#prep-card-2").click(function(){
		loadList(this.id, card_lists[1], total_items);
  });

  /* Shelter registrations card */
	$("#prep-card-3").click(function(){
		checked_items = loadList(this.id, card_lists[2], total_items);
  });

  /* Create a communication plan card */
	$("#prep-card-4").click(function(){
		loadList(this.id, card_lists[3], total_items);
  });

  /* Plan for Your Pet card */
	$("#prep-card-5").click(function(){
		loadList(this.id, card_lists[4], total_items);
  });

  /* Plan for Your Pet card */
	$("#prep-card-6").click(function(){
		loadList(this.id, card_lists[5], total_items);
  });
});


/*updates value on the card and checked or unchecked items*/
function checkedItem(id) {
	var item = id.split('-')[0] + "-";
	var card = id.split(item)[1] + "-count";

	var count_total = parseInt(sessionStorage.getItem('total_checked'));

	if(!(sessionStorage.getItem(id))){
		sessionStorage.setItem(id, true);
    var count = parseInt(sessionStorage.getItem(card));
    sessionStorage.setItem(card, count+1);
    sessionStorage.setItem('total_checked', count_total+1);
	}
	else {
		if(sessionStorage.getItem(id) == "true") {
			sessionStorage.setItem(id, false);
			var count = sessionStorage.getItem(card);
			sessionStorage.setItem(card, count-1);
			sessionStorage.setItem('total_checked', count_total-1);
		}
		else {
			sessionStorage.setItem(id, true);
    	var count = parseInt(sessionStorage.getItem(card));
    	sessionStorage.setItem(card, count+1);
    	sessionStorage.setItem('total_checked', count_total+1);
		}
	}

}

/* closes preparation list and updates value on preparation card */
function closePrepList(id, total_items) {
	$(".preparation-list-background").remove();
	var card_number = (id.split('-')[3])
	var item = id.split('-')[0] + "-";
	var card = id.split(item)[1] + "-count";
	var countdown = "countdown-" + card_number;
	var total_items_list = (document.getElementById(countdown).innerHTML).split(" ")[2];
	document.getElementById(countdown).innerHTML = sessionStorage.getItem(card) + " of " + total_items_list;

	var percentage = (sessionStorage.getItem('total_checked')/total_items)*100;
	document.getElementById("preparation-bar-percentage").innerHTML = "You are " + parseInt(percentage) +"% prepared";
	document.getElementById("preparation-bar-inner").style.width = (String(parseInt(percentage))+"%");
}

/*Creates html code for given list and card*/
function createListItems(list_items, card_id, total_items) {
	var init = "<div>\
    						<div id='close-" + card_id + "' onclick='closePrepList(this.id" + "," + total_items + ")' class='col-12'>close</div>\
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


function createMap() {
  var mapOptions = {
      center: new google.maps.LatLng(51.5, -0.12),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.HYBRID
   	}
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}


/*loads checked item on list*/
function loadCheckedItem(id) {
  if(sessionStorage.getItem(id) == "true") {
	  document.getElementById(id).checked = true;
	  return 1;
	}
	else {
	  document.getElementById(id).checked = false;
	  return 0;
	}
}

/*Creates list background and list items*/
function loadList(id, items_list, total_items) {
	var checked_items = 0;
	var list = $("<div class='preparation-list-background'><div class='preparation-list'></div>");
  $("body").append(list);
  var content = createListItems(items_list, id, total_items);
  $(".preparation-list").append(content);

	for (var i = 0; i < items_list.length; i++) {
	  checked_items += loadCheckedItem("item"+i+"-"+id)
	}
}
