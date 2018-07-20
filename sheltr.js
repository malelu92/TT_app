/***********************************************************************
**	MHCI Capstone Project - Sheltr.
**	Brooke Sachs, Ketki Jadhav, Marina Leao Lucena, Nishchala Singhal.
**	July 2018
************************************************************************/


$(document).ready(function() {

			sessionStorage.setItem('card_expanded', "no");
		sessionStorage.setItem('saved', "no");

	/* Load if evacuation screen. */
	if(document.getElementById("map")) {

		sessionStorage.setItem('plan-card', 0);
		sessionStorage.setItem('toggle', "left");

		/* Position second and third cards based on screen size. */
		var card_margin = 6;

		var margin_left_plan_b = parseInt(document.getElementById("plan-1-card").getBoundingClientRect().right) + card_margin;
		document.getElementById("plan-2-card").style.marginLeft = margin_left_plan_b + "px";

		var margin_left_plan_c = parseInt(document.getElementById("plan-2-card").getBoundingClientRect().right) + card_margin;
		document.getElementById("plan-3-card").style.marginLeft = margin_left_plan_c + "px";

		/* Swipe cards. */
		var el = document.getElementById('swipe-area');
		swipedetect(el, function(swipedir){
			var swipe_pixels = parseInt(document.getElementById("plan-1-card").getBoundingClientRect().width) + card_margin;

	    if (swipedir == "left") {  
		  	swipeAllCardsLeft(document.getElementById("plan-1-card"), document.getElementById("plan-2-card"), document.getElementById("plan-3-card"), swipe_pixels);
	    }    
	    if (swipedir == "right") {
	    	swipeAllCardsRight(document.getElementById("plan-1-card"), document.getElementById("plan-2-card"), document.getElementById("plan-3-card"), swipe_pixels);	
	    }
		});

		/* Update view when clicking on toggle switch*/
	  $("#toggle").click(function(){
	  	if(sessionStorage.getItem('toggle') == "left") {
	  		switchRight();
	  		sessionStorage.setItem('toggle', "right");
	  		$(".evacuation-transform").not(this).removeClass('evacuation-transform-map-mode').addClass('evacuation-transform-list-mode');
	  	}
	  	else {
	  		switchLeft();
	  		sessionStorage.setItem('toggle', "left");
	  		$(".evacuation-transform").not(this).removeClass('evacuation-transform-list-mode').addClass('evacuation-transform-map-mode');
	  	}
	  });

	  /* Update view when clicking on first card on list view*/
	  $("#plan-1-card").click(function(){
	  	if(sessionStorage.getItem('toggle') == "right") {
	  		switchLeft();
	  		sessionStorage.setItem('toggle', "left");
	  		$(".evacuation-transform").removeClass('evacuation-transform-list-mode').addClass('evacuation-transform-map-mode');
	  	}
	  });

	/* Update view when clicking on second card on list view*/
	/* TODO: make it responsive */
	  /*$("#plan-2-card").click(function(){
	  	console.log("card 1")
	  	if(sessionStorage.getItem('toggle') == "right") {
	  		switchLeft();
	  		sessionStorage.setItem('toggle', "left");
	  		$(".evacuation-transform").removeClass('evacuation-transform-list-mode').addClass('evacuation-transform-map-mode-middle-card-clicked');
	  		document.getElementById("map-image").src = "images/planB_background.jpg";
	  	}
	  });*/

	}


	/* Only load if preparation screen */
	if(document.getElementById("prep-card-1")) {

		var card_lists = [
			["First Name", "Last name", "Street Address", "Address line 2", "P.O. Box", "City, State", "Phone number"],
			["First Name", "Last name", "Street Address", "Address line 2", "P.O. Box", "City, State", "Phone number"],
			["Buy batteries", "3 days of food", "Water - 9 gallons", "Flashlights", "Sleeping bag", "Toilet paper", "Phone charger", 
			 "Battery radio", "Can opener", "Towelletes", "Extra Clothing", "Matches"],
			["Medication", "More medication", "Towelletes", "Extra Clothing", "Matches"],
			["Medication", "More medication", "Towelletes", "Extra Clothing", "Matches"]
		];

		if(!(sessionStorage.getItem('total_checked'))) {
			sessionStorage.setItem('total_checked', 0);
			initializeCardSessionStorage(card_lists);
		}

		var total_items = calculateTotalItems(card_lists);


		for(var i=1; i<=card_lists.length; i++) {
			var card_id = "prep-card-" + i;
			updatePercentageBarCard(card_id);
		}
			/* updates overall bar */
		updatePercentageBar(total_items);

		/* Load list of emergency contact card */
		$("#prep-card-1").click(function(){
			loadList(this.id, card_lists[0], "check", total_items);
		});

		/* Load list of emergency kit card */
		$("#prep-card-2").click(function(){
			loadList(this.id, card_lists[1], "check", total_items);
	  });

	  /* Load list of shelter registrations card */
		$("#prep-card-3").click(function(){
			loadList(this.id, card_lists[2], "check", total_items);
			/*loadList(this.id, card_lists[2], total_items);*/
	  });

	  /* Load list of create a communication plan card */
		$("#prep-card-4").click(function(){
			loadList(this.id, card_lists[3], "check", total_items);
	  });

	  /* Load list of plan for your pet card */
		$("#prep-card-5").click(function(){
			loadList(this.id, card_lists[4], "check", total_items);
	  });
	}


	/* Only load if registration screen */
	if(document.getElementById("reg-card-1")) {

		/*sessionStorage.setItem('card_expanded', "no");
		sessionStorage.setItem('saved', "no");*/

		var card_lists = [
			["First Name", "Last name", "Street Address", "Address Line 2", "P.O. Box", "City, State", "Phone Number"],
			["First Name", "Last name", "Street Address", "Address Line 2", "P.O. Box", "City, State", "Phone Number"],
			["Blind/Low Vision", "Deaf/Hard of hearing", "Contagious Disease", "Frail/Elderly", "Speech Impediment", "Physical Disability",
			"Bedridden", "Mentally/Memory Impaired", "Dementia/Alzheimer's", "Dialysis", "Requires contants skilled nursing", "Assistance with medication",
			"Assistance with insulin", "Requires refrigerated medication", "Medications", "Austism", "Sepcial dietary needs", "Seizures", "Other"],
			["Ventilator", "Suction machine", "Catheters", "Feeding tube", "Oxygen concentrator", "Other"],
			["Items", "Items", "Items", "Items", "Items", "Items", "Items"],
			["Items"],
			["Items"],
			["Items"],
			["Items"]	
		];

		/* Load list of emergency contact card */
		$("#reg-card-1").click(function(){
			loadList(this.id, card_lists[0], "text");
		});

		/* Load list of emergency kit card */
		$("#reg-card-2").click(function(){
			loadList(this.id, card_lists[1], "text");
	  });

	  /* Load list of shelter registrations card */
		$("#reg-card-3").click(function(){
			loadList(this.id, card_lists[2], "check");
	  });

	  /* Load list of create a communication plan card */
		$("#reg-card-4").click(function(){
			loadList(this.id, card_lists[3], "check");
	  });

	  /* Load list of plan for your pet card */
		$("#reg-card-5").click(function(){
			loadList(this.id, card_lists[4], "check");
	  });

	  /* Load list of know your evacuation route card */
		$("#reg-card-6").click(function(){
			loadList(this.id, card_lists[5], "check");
	  });

	  /* Load list of know your evacuation route card */
		$("#reg-card-7").click(function(){
			loadList(this.id, card_lists[6], "check");
	  });

	  /* Load list of know your evacuation route card */
		$("#reg-card-8").click(function(){
			loadList(this.id, card_lists[7], "check");
	  });

	  /* Load list of know your evacuation route card */
		$("#reg-card-9").click(function(){
			loadList(this.id, card_lists[8], "check");
	  });

		$("#registration-close").click(function(){
			console.log("lele")
			$("#registration-message").remove();
	  });
	}
});



/* 
** Saves checked items on card pop-up and close the pop-up.
** Parameters:
** 	card_id: card id of card with open list (string).
** 	total_items: total number of items in all cards (integer).
*/
function buttonSave(card_id, total_items) {
	var card_string = "#" + card_id;
	if (sessionStorage.getItem('card_expanded') == "yes") {
		$(card_string).removeClass('card-transform');
		$(card_string).addClass('card-retransform');
		sessionStorage.setItem('card_expanded', "no");
		sessionStorage.setItem('saved', "yes");
		var screen = card_id.split('-')[0];

		if (screen == "prep") {
			updatePercentageBarCard(card_id);
			updatePercentageBar(total_items);
		}

		var content = document.getElementById('list-items');
		content.remove();
		var content = document.getElementById('list-items');
		if (content) {
			content.remove();
		}

		console.log(card_id)
		document.getElementById(card_id).style.height = "100px";

		setTimeout(function(){
      $(card_string).removeClass('card-retransform');
      $(".preparation-list-background").remove();
    }, 300);



	}
}


function initializeCardSessionStorage(card_lists) {

	for(var i=1; i<=card_lists.length; i++) {
		var card = "prep-card-" + i + "-count";
		sessionStorage.setItem(card, 0);
	}

}


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

	updatePercentageBar(total_items);
}



/*
** Creates html code for a given list in the format of a checkbox.
** Parameters:
**	list_items: items on the list (array of strings).
**	card_id: id of the card that the list relates to (string).
**	total_items: total number of items in all lists added (integer).
*/
function createListItems(list_items, card_id, total_items) {
	var init = "<div id=list-items>\
    						<label class='list-container'>";
  var end = '<button id = "save" class="button-save" onclick="buttonSave(\'' + card_id + '\', \'' + total_items + '\')">save</button><button id="clear">clear</button></label>\
    								</div>';
  var middle = "";
  for (var i = 0; i < list_items.length; i++) {
  	middle = middle + "<div class='col-12 checkbox-line'>\
  											<label class='checkbox-container'>\
  												<div class='checkbox-text'>" + list_items[i] +"</div>\
  												<input type='checkbox' id='item" + i + "-" + card_id + "' onclick='checkedItem(this.id)'>\
    											<span class='checkmark'></span>\
    										</label>\
    									</div>"; 
  }

  return init + middle + end;
}



/*
** Creates html code for a given list in the form of textboxes.
** Parameters:
**	list_items: items on the list (array of strings).
**	card_id: id of the card that the list relates to (string).
**	total_items: total number of items in all lists added (integer).
*/
function createTextBoxItems(list_items, card_id, total_items) {
	var init = "<div id=list-items>\
    						<label class='list-container'>"
  var end = '<button id = "save" class="button-save" onclick="buttonSave(\'' + card_id + '\', \'' + total_items + '\')">save</button><button id="clear">clear</button>\
  							</label>\
    								</div>';
  var middle = "";
  for (var i = 0; i < list_items.length; i++) {
  	middle = middle + "<div class='col-12'>\
  											<div class='card-sub-item'>" + 
  												list_items[i] + 
  											"</div>\
  											<input type='textbox' class='text-box' col-12' id=item" + i + "-" + card_id + " onclick='checkedItem(this.id)'>\
    										</div>"; 
  }



  if(card_id == "reg-card-1") {
  	middle = middle + "<br><br><div class='col-12 checkbox-line'>\
  											<label class='checkbox-container sole-item'>\
  												<div class='checkbox-text'> Set yourself as registrant's emergency contacts </div>\
  												<input type='checkbox' id='item" + i + "-" + card_id + "' onclick='checkedItem(this.id)'>\
    											<span class='checkmark'></span>\
    										</label>\
    									</div>"
	}

  return init + middle + end;
}




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
**  type: can be either "text" for creating text boxes or "check" for creating checkboxes (string).
**	total_items: total number of items in all lists (integer).
*/
function loadList(id, items_list, type, total_items) {
	var id_string = "#" + id;
	var checked_items = 0;

	if ((sessionStorage.getItem('card_expanded') == "no") & (sessionStorage.getItem('saved') == "no")){
			var list = $("<div class='preparation-list-background'>");
  		$("body").append(list);
			$(id_string).addClass('card-transform');




			/*console.log("list")
			console.log(items_list.length)

			var height = items_list.length*6
			$('.card-transform').height(height + "vh");*/


			sessionStorage.setItem('card_expanded', "yes");

			/* card has checkboxes */
			if (type == "check") {
				var content = createListItems(items_list, id, total_items);
				$(id_string).append(content);


				var rect2 = document.getElementById(id).getBoundingClientRect();
				console.log(rect2)
				var rect1 = document.getElementById("save").getBoundingClientRect();
				console.log(rect1)
				var rect = document.getElementById("clear").getBoundingClientRect();
				console.log(rect)


				var height = rect1.top - rect2.top
				$('.card-transform').height(height + "px");




				for (var i = 0; i < items_list.length; i++) {
	  			checked_items += loadCheckedItem("item"+i+"-"+id)
				}
			}
			/* card has textboxes */
			else {
				var content = createTextBoxItems(items_list, id, total_items);




				$(id_string).append(content);


				var rect2 = document.getElementById(id).getBoundingClientRect();
				console.log(rect2)
				var rect1 = document.getElementById("save").getBoundingClientRect();
				console.log(rect1)
				var rect = document.getElementById("clear").getBoundingClientRect();
				console.log(rect)



								var height = rect1.top - rect2.top
				$('.card-transform').height(height + "px");
			}

			document.getElementById("registration-message").style.zIndex = "1";
document.getElementById("registration-message").style.backgroundColor = "#ffffff";


	}
	else {
		sessionStorage.setItem('saved', "no");
		/*setTimeout(function(){
      $(".preparation-list-background").remove();
    }, 1600);*/

	}
}



/*
** Moves toggle switch left.
*/
function switchLeft() {
	var pos= 100;

	var id = setInterval(function() {
		for (var i = 0; i < 2; i++) {
		  if (pos == 0) {
		  	document.getElementById("map_view").style.color = "#000000"; 
		  	document.getElementById("list_view").style.color = "#ffffff"; 
		    clearInterval(id);
		    return;
		  }
		  else {
		    pos = pos - 1; 
		    document.getElementById("toggle-bar").style.left = pos + 'px'; 
			}
		}
	}, 10);
}

/*
** Moves toggle switch right.
*/
function switchRight() {
	var toggle_width = document.getElementById("toggle").getBoundingClientRect().width;
	var pos= 0;

	var id = setInterval(function() {
		for (var i = 0; i < 2; i++) {
		  if (pos == parseInt(toggle_width/2)) {
		  	document.getElementById("map_view").style.color = "#ffffff"; 
		  	document.getElementById("list_view").style.color = "#000000"; 
		    clearInterval(id);
		    return;
		  }
		  else 
		  {
		    pos = pos + 1; 
		    document.getElementById("toggle-bar").style.left = pos + 'px'; 
			}
		}
	}, 10);
}


/*
** Swipes all cards left.
** Parameters:
**	card_1: first card's id (string).
**	card_2: second card's id (string).
**	card_3: third card's id (string).
**	swipe_pixels: number of pixels cards will swipe left (integer).
*/
function swipeAllCardsLeft (card_1, card_2, card_3, swipe_pixels) {

	var card_pos = sessionStorage.getItem("plan-card");
	var pos = card_pos;

	var id = setInterval(function() {
		for (var i = 0; i < 20; i++) {
		  if (pos == card_pos - swipe_pixels) {

		  	sessionStorage.setItem("plan-card", pos);
		    clearInterval(id);

		    /* plan B card on screen */
		    if (pos == -swipe_pixels) {
		    	document.getElementById("map-image").src = "images/planB_background.jpg";
		    }

		    /* plan C card on screen */
		    if (pos == -(2*swipe_pixels)) {
		    	document.getElementById("map-image").src = "images/planC_background.jpg";
		    }

		    return;
		  }
		  else {
		    pos = pos - 1;
		    card_1.style.left = pos + 'px'; 
		    card_2.style.left = pos + 'px'; 
		    card_3.style.left = pos + 'px'; 
  		}
		}
	}, 10);
}




/*
** Swipes all cards right.
** Parameters:
**	card_1: first card's id (string).
**	card_2: second card's id (string).
**	card_3: third card's id (string).
**	swipe_pixels: number of pixels cards will swipe right (integer).
*/
function swipeAllCardsRight (card_1, card_2, card_3, swipe_pixels) {

	var card_pos = parseInt(sessionStorage.getItem("plan-card"));
	var pos = parseInt(card_pos);

	var id = setInterval(function() {
		for (var i = 0; i < 20; i++) {
		  if (pos == card_pos + swipe_pixels) {
		  	sessionStorage.setItem("plan-card", pos);
		    clearInterval(id);

		    /* plan A card on screen */
		    if (pos == 0) {
		    	document.getElementById("map-image").src = "images/planA_background.png";
		    }

		    /* plan B card on screen */
		    if (pos == -swipe_pixels) {
		    	document.getElementById("map-image").src = "images/planB_background.jpg";
		    }
		    return;
		  }
		  else 
		  {
		    pos = pos + 1; 
		    card_1.style.left = pos + 'px'; 
		    card_2.style.left = pos + 'px'; 
		    card_3.style.left = pos + 'px'; 
			}
		}
	}, 10);
}


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




function updatePercentageBar(total_items) {
			var percentage = (sessionStorage.getItem('total_checked')/total_items)*100;
			document.getElementById("preparation-bar-percentage").innerHTML = "You are " + parseInt(percentage) +"% prepared";
			document.getElementById("preparation-bar-inner").style.width = (String(parseInt(percentage))+"%");

			if (percentage > 50) {
				document.getElementById("preparation-image").src = "images/prep_two.png";
			}	
}

function updatePercentageBarCard(card_id) {

			var card_number = (card_id.split('-')[2])
			var item = card_id.split('-')[0] + "-";
			var card = "prep-" + card_id.split(item)[1] + "-count";
			var countdown = "countdown-" + card_number;
			
			var total_items_list = (document.getElementById(countdown).innerHTML).split(" ")[2];
			var prep_bar_inner_id = "preparation-bar-inner-card-" + card_number;

			/* updates card bar */
			var card_percentage = (sessionStorage.getItem(card)/total_items_list)*100;
			document.getElementById(prep_bar_inner_id).style.width = (String(parseInt(card_percentage))+"%");
			document.getElementById(prep_bar_inner_id).style.height = "1vh";
			document.getElementById(prep_bar_inner_id).style.backgroundColor = "#5E39FF";
			document.getElementById(prep_bar_inner_id).style.borderRadius = "25px";

}


