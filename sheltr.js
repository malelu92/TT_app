/***********************************************************************
**	MHCI Capstone Project - Sheltr.
**	Brooke Sachs, Ketki Jadhav, Marina Leao Lucena, Nishchala Singhal.
**	July 2018
************************************************************************/


$(document).ready(function() {

	/* Only load if evacuation screen */
	/* TO DO: finish swipe functions */
	if(document.getElementById("map")) {

		/*sessionStorage.setItem('plan-1-card', 0);
		sessionStorage.setItem('plan-2-card', 0);
		sessionStorage.setItem('plan-3-card', 0);*/
		sessionStorage.setItem('plan-card', 0);

		var el = document.getElementById('swipezone');
		/*swipedetect(el, function(swipedir){
    // swipedir contains either "none", "left", "right", "top", or "down"
	    if (swipedir == "left") {  
		  	swipeAllCardsLeft(document.getElementById("plan-1-card"), document.getElementById("plan-2-card"), document.getElementById("plan-3-card"));
	    }    
	    if (swipedir == "right") {
	    	swipeAllCardsRight(document.getElementById("plan-1-card"), document.getElementById("plan-2-card"), document.getElementById("plan-3-card"));	
	    }

	    console.log(swipedir)
	    el.innerHTML = 'Swiped <span style="color:yellow">' + swipedir +'</span>';
		});*/

		var el = document.getElementById('swipe-area');
		swipedetect(el, function(swipedir){
    // swipedir contains either "none", "left", "right", "top", or "down"
	    if (swipedir == "left") {  
		  	swipeAllCardsLeft(document.getElementById("plan-1-card"), document.getElementById("plan-2-card"), document.getElementById("plan-3-card"));
	    }    
	    if (swipedir == "right") {
	    	swipeAllCardsRight(document.getElementById("plan-1-card"), document.getElementById("plan-2-card"), document.getElementById("plan-3-card"));	
	    }

	    console.log(swipedir)
	    /*el.innerHTML = 'Swiped <span style="color:yellow">' + swipedir +'</span>';*/
		});






		/*initMap();*/
	}


	/* Only load if preparation screen */
	if(document.getElementById("prep-card-1")) {
		sessionStorage.setItem('total_checked', 0);

		var card_lists = [
			["Marina1", "Marina2", "Marina3"],
			["Brazil", "USA", "India", "England"],
			["Ketki", "Nishchala", "Brooke", "Marina", "Jon", "Jerek"],
			["Lala", "Lele"],
			["Hi"],
			["Purple", "Blue", "Orange", "Yellow"]
		];

		var total_items = calculateTotalItems(card_lists);

		/* Load list of emergency contact card */
		$("#prep-card-1").click(function(){
			loadList(this.id, card_lists[0], total_items);
		});

		/* Load list of emergency kit card */
		$("#prep-card-2").click(function(){
			loadList(this.id, card_lists[1], total_items);
	  });

	  /* Load list of shelter registrations card */
		$("#prep-card-3").click(function(){
			loadList(this.id, card_lists[2], total_items);
	  });

	  /* Load list of create a communication plan card */
		$("#prep-card-4").click(function(){
			loadList(this.id, card_lists[3], total_items);
	  });

	  /* Load list of plan for your pet card */
		$("#prep-card-5").click(function(){
			loadList(this.id, card_lists[4], total_items);
	  });

	  /* Load list of know your evacuation route card */
		$("#prep-card-6").click(function(){
			loadList(this.id, card_lists[5], total_items);
	  });
	}

});


/* 
** Calculates total number of items based on all the lists.
** Parameters:
** 	cards_lists: array containing all the lists in the preparation cards (array of arrays (strings)).
** Return:
** 	total_items: total number of items contained in the cards' lists (integer).
*/
function calculateTotalItems(card_lists) {
		var total_items = 0;
		for (var i=1; i<=card_lists.length; i++) {
			var countdown = "countdown-" + i;
			var prep_card = 'prep-card-' + i + '-count';
			sessionStorage.setItem(prep_card, 0);
			document.getElementById(countdown).innerHTML = sessionStorage.getItem(prep_card) + " of " + (card_lists[i-1]).length;
			total_items += (card_lists[i-1]).length;
		}
		return total_items;
}


/* 
** Updates sessionStorage of checked or unchecked items on specific list and the total number of checked items accross all cards.
** Parameters:
** 	id: id of specific item, for example: item1-prep-card-5 (string).
*/
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



/* 
** Closes preparation list and updates number of checked items on preparation card and the percentage on preparation bar.
** Parameters:
**	id: id of the card that the list relates to (string).
**	total_items: total number of items in all lists added (integer).
*/
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



/*
** Creates html code for a given list.
** Parameters:
**	list_items: items on the list (array of strings).
**	card_id: id of the card that the list relates to (string).
**	total_items: total number of items in all lists added (integer).
*/
function createListItems(list_items, card_id, total_items) {
	var init = "<div>\
    						<div id='close-" + card_id + "' onclick='closePrepList(this.id" + "," + total_items + ")' class='col-12'>close</div>\
    						<label class='list-container'>";
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


/*
TO DO: fix card swipe before activating this function (even if not called, brings an exception on debugging. 
Load Google Maps on the evacuation screen.
*/
	/*var map;
	function initMap() {
		var myLatLng = {lat: 27.923966, lng: -82.520319};

	  map = new google.maps.Map(document.getElementById('map'), {
	        	zoom: 13,
	        	center: myLatLng,
	        	mapTypeId: 'terrain'
	      	});

	  var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'My house'
        });
	}*/



/*
** Loads checked item on list.
** Parameter:
**	id: item id in specific list (string). 
*/
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



/*
** Loads list of items on the card.
** Parameters:
**	id: card id (string).
**	items_list: items on the list (array of strings).
**	total_items: total number of items in all lists (integer).
*/
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


/* TO DO: finish function*/
function swipeAllCardsLeft (card_1, card_2, card_3) {
	
/*var card_1_pos = card_1.getBoundingClientRect();
console.log(card_1_pos.left);*/
	/*swipeCardLeft(card_1);
	swipeCardLeft(card_2);
	swipeCardLeft(card_3);*/

	/*var card_pos = sessionStorage.getItem(card_id);*/
	var card_pos = sessionStorage.getItem("plan-card");
	console.log(card_pos)
	/*var card_2_pos = card_2.getBoundingClientRect();*/
	var pos = card_pos; /*card_pos.left; 0;*/
	var id = setInterval(frame, 1);
  function frame() {
	  if (pos == card_pos - 810) {
	  	sessionStorage.setItem("plan-card", pos);
	    clearInterval(id);
	    return;
	  }
	  else {
	    pos = pos - 2; 
	    card_1.style.left = pos + 'px'; 
	    card_2.style.left = pos + 'px'; 
	    card_3.style.left = pos + 'px'; 
	    if(pos == -1620){
	    	console.log(pos)
	  	}
	  }
	}


}

function swipeAllCardsRight (card_1, card_2, card_3) {

	/*swipeCardRight(card_1);
	swipeCardRight(card_2);
	swipeCardRight(card_3);*/

	var card_pos = parseInt(sessionStorage.getItem("plan-card"));
	console.log(card_pos)
	/*var card_2_pos = card_2.getBoundingClientRect();*/
	var pos = parseInt(card_pos); /*card_pos.left; 0;*/
	var id = setInterval(frame, 1);
  function frame() {
	  if (pos == card_pos + 810) {
	  	sessionStorage.setItem("plan-card", pos);
	    clearInterval(id);
	    return;
	  }
	  else {
	    pos = pos + 2; 
	    console.log(pos)
	    card_1.style.left = pos + 'px'; 
	    card_2.style.left = pos + 'px'; 
	    card_3.style.left = pos + 'px'; 
	    if(pos == 1620){
	    	console.log(pos)
	  	}
	  }
	}
}



/* TO DO: finish function*/
function swipeCardLeft (card) {
	card_id = card.getAttribute("id");
	console.log(card.getAttribute("id"))
	/*var card_pos = sessionStorage.getItem(card_id);*/
	var card_pos = sessionStorage.getItem("plan-card");
	console.log(card_pos)
	/*var card_2_pos = card_2.getBoundingClientRect();*/
	var pos = card_pos; /*card_pos.left; 0;*/
	var id = setInterval(frame, 1);
  function frame() {
	  if (pos == card_pos - 810) {
	  	sessionStorage.setItem("plan-card", pos);
	    clearInterval(id);
	    return;
	  }
	  else {
	    pos = pos - 2; 
	    card.style.left = pos + 'px'; 
	    if(pos == -1620){
	    	console.log(pos)
	  	}
	  }
	}
}


/* TO DO: finish function*/
function swipeCardRight (card) {

	card_id = card.getAttribute("id");
	console.log(card.getAttribute("id"))
	/*var card_pos = sessionStorage.getItem(card_id);*/
	var card_pos = sessionStorage.getItem("plan-card");
	console.log(card_pos)
	/*var card_2_pos = card_2.getBoundingClientRect();*/
	var pos = parseInt(card_pos); /*card_pos.left; 0;*/
	var id = setInterval(frame, 1);
  function frame() {
	  if (pos == card_pos + 810) {
	  	sessionStorage.setItem("plan-card", pos);
	    clearInterval(id);
	    return;
	  }
	  else {
	    pos = pos + 2; 
	    console.log(pos)
	    card.style.left = pos + 'px'; 
	    if(pos == 1620){
	    	console.log(pos)
	  	}
	  }
	}


	/*var elem = document.getElementById("evacuation-plan");*/  
	/*var pos = 0;
	var id = setInterval(frame, 1);
  function frame() {
	  if (pos == 350) {

	    clearInterval(id);
	  }
	  else {
	    pos = pos + 3; 
	    card_1.style.left = pos + 'px'; 
	  }
	}*/
}



/* TO DO: edit this function to make it proper to the given plans. */
// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

