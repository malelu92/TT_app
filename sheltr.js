/***********************************************************************
**	MHCI Capstone Project - Sheltr.
**	Brooke Sachs, Ketki Jadhav, Marina Leao Lucena, Nishchala Singhal.
**	July 2018
************************************************************************/


$(document).ready(function() {

	console.log("all")
	sessionStorage.setItem('card_expanded', "no");
	sessionStorage.setItem('saved', "no");

	/* Load if login screen. */
	if(document.getElementById("login-greeting")) {
		sessionStorage.setItem('login_menu_expanded', "no");

		$("#button-create-account").click(function(){
			document.location.href = "registration.html";
		});

		$("#login-dropdown-container").click(function(){
			if(sessionStorage.getItem('login_menu_expanded') == "no") {
				sessionStorage.setItem('login_menu_expanded', "yes");
				$("#login-dropdown-container").addClass('login-dropdown-transform');
				$("#login-dropdown-container").append("<div id='login-options'>\
																							<div class='login-dropdown-text'>\
																								Person without medical needs\
																							</div>\
																							<div class='login-dropdown-text'>\
																								Person with medical needs\
																							</div>\
																							</div>"
																						);
				document.getElementById("login-dropdown-arrow").src = "images/dropdown_arrow_up.png";
			}
			else {
				sessionStorage.setItem('login_menu_expanded', "no");
				document.getElementById("login-dropdown-arrow").src = "images/dropdown_arrow.png";
				$('#login-options').remove();
				$("#login-dropdown-container").removeClass('login-dropdown-transform');
			}
		});
	}


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

		var card_messages = [
			["List people who can be contacted in case of an emergency. Make sure to add at least one out of town contact"], 
			["message2"], 
			["Items that you should always have with you in case of a disaster"], 
			["message4"], 
			["message5"]
		];

		var card_lists = [
			["First Name", "Last name", "Street Address", "Address line 2", "P.O. Box", "City, State", "Phone number"],
			["First Name", "Last name", "Street Address", "Address line 2", "P.O. Box", "City, State", "Phone number"],
			["Buy batteries", "3 days of food", "Water - 9 gallons", "Flashlights", "Sleeping bag", "Toilet paper", "Phone charger", 
			 "Battery radio", "Can opener", "Towelletes", "Extra Clothing", "Matches"],
			["Medication", "More medication", "Towelletes", "Extra Clothing", "Matches"],
			["Medication", "More medication", "Towelletes", "Extra Clothing", "Matches"]
		];

		var images = [
		["prep_card_1_img.png"],
		["prep_card_1_img.png"],
		["prep_card_3_img.png"],
		["prep_card_1_img.png"],
		["prep_card_1_img.png"]
		];

		if(!(sessionStorage.getItem('total_checked'))) {
			sessionStorage.setItem('total_checked', 0);
			sessionStorage.setItem('total_adults', 0);
			sessionStorage.setItem('total_children', 0);
			sessionStorage.setItem('total_pets', 0);
			initializeCardSessionStorage(card_lists, "prep");
			loadCitizenCountScreen();
		}

		var total_items = calculateTotalItems(card_lists, "prep");

		/* updates cards bar */
		for(var i=1; i<=card_lists.length; i++) {
			var card_id = "prep-card-" + i;
			updatePercentageBarCard(card_id, "prep");
		}

		/* updates overall bar */
		updatePercentageBar(total_items);

		/* Load card list 1 */
		$("#prep-card-1").click(function(){
			loadList(this.id, card_messages[0], images[0], card_lists[0], "text", total_items);
		});

		/* Load card list 2 */
		$("#prep-card-2").click(function(){
			loadList(this.id, card_messages[1], images[1], card_lists[1], "check", total_items);
	  });

	  /* Load card list 3 */
		$("#prep-card-3").click(function(){
			loadList(this.id, card_messages[2], images[2], card_lists[2], "check", total_items);
	  });

	  /* Load card list 4 */
		$("#prep-card-4").click(function(){
			loadList(this.id, card_messages[3], images[3], card_lists[3], "check", total_items);
	  });

	  /* Load card list 5 */
		$("#prep-card-5").click(function(){
			loadList(this.id, card_messages[4], images[4], card_lists[4], "check", total_items);
	  });

		$("#minus-adults").click(function(){
			updateCitizen("adults", "subtract");
	  });

		$("#minus-children").click(function(){
			updateCitizen("children", "subtract");
	  });

		$("#minus-pets").click(function(){
			updateCitizen("pets", "subtract");
	  });

		$("#plus-adults").click(function(){
			updateCitizen("adults", "add");
	  });

		$("#plus-children").click(function(){
			updateCitizen("children", "add");
	  });

		$("#plus-pets").click(function(){
			updateCitizen("pets", "add");
	  });




	  $("#button-preparation-count").click(function(){
	  	$(".preparation-list-background").remove();
	  });
	  
	}


	/* Only load if registration screen */
	if(document.getElementById("reg-card-1")) {
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


		if(!(sessionStorage.getItem('total_checked_registration'))) {
			sessionStorage.setItem('total_checked_registration', 0);
			initializeCardSessionStorage(card_lists, "reg");
			loadWelcomeMessage();
		}

		var total_items = calculateTotalItems(card_lists, "reg");

		/* updates cards bar */
		for(var i=1; i<=card_lists.length; i++) {
			var card_id = "reg-card-" + i;
			updatePercentageBarCard(card_id, "reg");
		}


		/* Load card list 1 */
		$("#reg-card-1").click(function(){
			loadList(this.id, null, null, card_lists[0], "text", null);
		});

		/* Load card list 2 */
		$("#reg-card-2").click(function(){
			loadList(this.id, null, null, card_lists[1], "text", null);
	  });

	  /* Load card list 3 */
		$("#reg-card-3").click(function(){
			loadList(this.id, null, null, card_lists[2], "check", null);
	  });

	  /* Load card list 4 */
		$("#reg-card-4").click(function(){
			loadList(this.id, null, null, card_lists[3], "check", null);
	  });

	  /* Load card list 5 */
		$("#reg-card-5").click(function(){
			loadList(this.id, null, null, card_lists[4], "check", null);
	  });

	  /* Load card list 6 */
		$("#reg-card-6").click(function(){
			loadList(this.id, null, null, card_lists[5], "check", null);
	  });

	  /* Load card list 7 */
		$("#reg-card-7").click(function(){
			loadList(this.id, null, null, card_lists[6], "check", null);
	  });

	  /* Load card list 8 */
		$("#reg-card-8").click(function(){
			loadList(this.id, null, null, card_lists[7], "check", null);
	  });

	  /* Load card list 9 */
		$("#reg-card-9").click(function(){
			loadList(this.id, null, null, card_lists[8], "check", null);
	  });

		/* Close Florida Health message */
		$("#registration-close").click(function(){
			$("#registration-message").remove();
			document.getElementById("share-form").style.margin = "12vh 0 0 70vw";
			document.getElementById("registration-cards-body").style.margin = "8vh 0 10vh 0";
	  });



	  $("#registration-ok-button").click(function(){
	  	$(".preparation-list-background").remove();
	  });
	}
});





function updateCitizen(citizen_type, math) {
	session = "total_" + citizen_type;
	id = "count-" + citizen_type;
	if(math == "add") {
		count = parseInt(sessionStorage.getItem(session)) + 1;
	}
	else {
		count = parseInt(sessionStorage.getItem(session)) - 1;
		if (count < 0) {
			count = 0;
		}
	}
	document.getElementById(id).innerHTML = count;
	sessionStorage.setItem(session, count);
}



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
			updatePercentageBarCard(card_id, "prep");
			updatePercentageBar(total_items);
		}
		else {
			updatePercentageBarCard(card_id, "reg");
		}

		var content = document.getElementById('card-content');
		content.remove();
		var content = document.getElementById('card-content');
		if (content) {
			content.remove();
		}

		document.getElementById(card_id).style.height = "100px";

		var card_bar = "#" + card_id.split('-')[0] + "-card-bar-" + (card_id.split('-')[2]);
		$(card_bar).removeAttr('style');


		setTimeout(function(){
      $(card_string).removeClass('card-retransform');
      $(".preparation-list-background").remove();
    }, 300);

	}
}


/* 
** Calculates total number of items based on all the lists.
** Parameters:
** 	cards_lists: array containing all the lists in the preparation cards (array of arrays (strings)).
**  type: if card is on preparation or registration screen (String).
** Return:
** 	total_items: total number of items contained in the cards' lists (integer).
*/
function calculateTotalItems(card_lists, type) {
	var total_items = 0;
	for (var i=1; i<=card_lists.length; i++) {
		var countdown = type + "-countdown-" + i;
		var prep_card = type + '-card-' + i + '-count';
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

	console.log("kakak")
	console.log(id)

	var item = id.split('-')[0] + "-";
	var card = id.split(item)[1] + "-count";
	var card_type = id.split('-')[1];
	console.log(item)
	console.log(card)
	console.log(card_type)

	if(card_type == "prep") {
		var total_checked = "total_checked";
	}
	else {
		var total_checked = "total_checked_registration";
	}

	var count_total = parseInt(sessionStorage.getItem(total_checked));

	if(!(sessionStorage.getItem(id))){
		sessionStorage.setItem(id, true);
    var count = parseInt(sessionStorage.getItem(card));
    sessionStorage.setItem(card, count+1);
    sessionStorage.setItem(total_checked, count_total+1);
	}
	else {
		if(sessionStorage.getItem(id) == "true") {
			sessionStorage.setItem(id, false);
			var count = sessionStorage.getItem(card);
			sessionStorage.setItem(card, count-1);
			sessionStorage.setItem(total_checked, count_total-1);
		}
		else {
			sessionStorage.setItem(id, true);
    	var count = parseInt(sessionStorage.getItem(card));
    	sessionStorage.setItem(card, count+1);
    	sessionStorage.setItem(total_checked, count_total+1);
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
** 	message: message contained on top of expanded card (string).
** 	card_image: image name (string).
**	card_id: id of the card that the list relates to (string).
**	total_items: total number of items in all lists added (integer).
**  type: if card contains checkboxes or textboxes (string).
*/
function createCardItems(list_items, message, card_image, card_id, total_items, type) {
	var init = '<div id="card-content">\
								<div id="card-top-container">\
    							<div id="card-image-container"><img id="card-image" src=\'images/' + card_image + '\'></div>\
    							<div id="card-message">' + message + '</div>\
    					</div>\
    					<div id=list-items>\
    						<label class="list-container">';
  var end = '<button id = "save" class="button-save" onclick="buttonSave(\'' + card_id + '\', \'' + total_items + '\')">save</button><button id="clear">clear</button></label>\
    								</div></div>';
  var middle = "";

  /* if checkboxes */
  if (type == "check") {
	  for (var i = 0; i < list_items.length; i++) {
	  	middle = middle + "<div class='col-12 checkbox-line'>\
	  											<label class='checkbox-container'>\
	  												<div class='checkbox-text'>" + list_items[i] +"</div>\
	  												<input type='checkbox' id='item" + i + "-" + card_id + "' onclick='checkedItem(this.id)'>\
	    											<span class='checkmark'></span>\
	    										</label>\
	    										<img class='preparation-info-icon' src='images/info_icon.png'>\
	    									</div>"; 
	  }
	}
	/* if textboxes */
	else {
	  for (var i = 0; i < list_items.length; i++) {
	  	middle = middle + "<div class='col-12'>\
	  											<div class='card-sub-item'>" + 
	  												list_items[i] + 
	  											"</div>\
	  											<input type='textbox' class='text-box' col-12' id=item" + i + "-" + card_id + " onclick='checkedItem(this.id)'>\
	    										</div>"; 
	  }


	  /* first reg card also has a checkbox */
	  if(card_id == "reg-card-1") {
	  	middle = middle + "<br><br><div class='col-12 checkbox-line'>\
	  											<label class='checkbox-container sole-item'>\
	  												<div class='checkbox-text'> Set yourself as registrant's emergency contacts </div>\
	  												<input type='checkbox' id='item" + i + "-" + card_id + "' onclick='checkedItem(this.id)'>\
	    											<span class='checkmark'></span>\
	    										</label>\
	    									</div>"
		}
	}

  return init + middle + end;
}



/* 
** Intializes sessionStorage checked items count of each card .
** Parameters:
** 	card_list: list with all the items in each card (array of array of strings).
** 	type: if card is on preparation or registration screen (String).
*/
function initializeCardSessionStorage(card_lists, type) {
	for(var i=1; i<=card_lists.length; i++) {
		var card = type + "-card-" + i + "-count";
		sessionStorage.setItem(card, 0);
	}
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
function loadList(id, message, card_image, items_list, type, total_items) {
	var id_string = "#" + id;
	var checked_items = 0;

	/* if card not expanded */
	if ((sessionStorage.getItem('card_expanded') == "no") & (sessionStorage.getItem('saved') == "no")){
		var list = $("<div class='preparation-list-background'>");
  	$("body").append(list);
		$(id_string).addClass('card-transform');
		sessionStorage.setItem('card_expanded', "yes");

		var content = createCardItems(items_list, message, card_image, id, total_items, type);
		$(id_string).append(content);

		/* moves preparation bar when card is expanded */
		var card_bar= id.split('-')[0] + "-card-bar-" + (id.split('-')[2])
		document.getElementById(card_bar).style.top = "28vh";

		/* calculates expanded card height */
		var card_pos = document.getElementById(id).getBoundingClientRect();
		var save_button_pos = document.getElementById("save").getBoundingClientRect();
		var height = save_button_pos.top - card_pos.top
		$('.card-transform').height(height + "px");

		/* loads checked items*/
		for (var i = 0; i < items_list.length; i++) {
	  	checked_items += loadCheckedItem("item"+i+"-"+id)
		}

		/* highlights Florida health message */
		if(id.split('-')[0] == "reg" & document.getElementById("registration-message") != null){
			document.getElementById("registration-message").style.zIndex = "1";
			document.getElementById("registration-message").style.backgroundColor = "#ffffff";
			document.getElementById("share-form").style.zIndex = "1";
		}
	}
	else {
		sessionStorage.setItem('saved', "no");
	}
}


/*
** Loads count popup on preparation screen.
*/
function loadCitizenCountScreen() {
	var count_screen = $("<div class='preparation-list-background'>\
												<div id='preparation-count-popup'>\
													<div class='registration-welcome-text step'>How many people are you preparing for?</div>\
													<div>\
														<div class='button-count-all col-12'>\
															<div class='preparation-count-popup-text'>Adults</div>\
																<div id='minus-adults' class='button-count minus'>-</div>\
																<div id='count-adults' class='button-count value'>0</div>\
																<div id='plus-adults' class='button-count plus'>+</div>\
															</div>\
														</div>\
														<div class='button-count-all col-12'>\
															<div class='preparation-count-popup-text'>Children</div>\
															<div id='minus-children' class='button-count minus'>-</div>\
															<div id='count-children' class='button-count value'>0</div>\
															<div id='plus-children' class='button-count plus'>+</div>\
														</div>\
														<div class='button-count-all col-12'>\
															<div class='preparation-count-popup-text'>Pets</div>\
															<div id='minus-pets' class='button-count minus'>-</div>\
															<div id='count-pets' class='button-count value'>0</div>\
															<div id='plus-pets' class='button-count plus'>+</div>\
														</div>\
														<button id='button-preparation-count'>Save to profile</button>\
													</div>\
											</div>");
  $("body").append(count_screen);

}



/*
** Loads welcome message on registration screen.
*/
function loadWelcomeMessage() {
	var reg_message = $("<div class='preparation-list-background'>\
												<div id='registration-welcome-message'>\
													<div id='registration-welcome-title'>Welcome Vanessa!</div>\
													<img class='registration-welcome-image' src='images/prep_card_1_img.png'>\
													<div class='registration-welcome-text step'>Step 1: Shelter registration</div>\
													<div class='registration-welcome-text'>As a caregiver, it is recommended that you register for a special medical needs shelter\
														on behalf of the person you take care of.</div>\
													<div class='registration-welcome-text'>This is important in case of an emergency evacuation.</div>\
													<div id='registration-ok-button'>OK</div>\
												</div>\
											</div>");
  $("body").append(reg_message);
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



/*
** Updates main percentage bar on top of preparation screen.
** Parameters:
**	total_items: total number of items in all lists (integer).
*/
function updatePercentageBar(total_items) {
			var percentage = (sessionStorage.getItem('total_checked')/total_items)*100;
			document.getElementById("preparation-bar-percentage").innerHTML = "You are " + parseInt(percentage) +"% prepared";
			document.getElementById("preparation-bar-inner").style.width = (String(parseInt(percentage))+"%");

			if (percentage > 50) {
				document.getElementById("preparation-image").src = "images/prep_two.png";
			}	
}


/*
** Updates percentage bar of specific card.
** Parameters:
**	card_id: id of card whose percentage is being updated (string).
**  type: if the card is on preparation screen or registration screen (string).
*/
function updatePercentageBarCard(card_id, type) {
			var card_number = (card_id.split('-')[2])
			var item = card_id.split('-')[0] + "-";
			var card = type + "-" + card_id.split(item)[1] + "-count";
			var countdown = card_id.split('-')[0] + "-countdown-" + card_number;
			
			var total_items_list = (document.getElementById(countdown).innerHTML).split(" ")[2];

			if (type == "prep") {
				var prep_bar_inner_id = "preparation-bar-inner-card-" + card_number;
			}
			else {
				var prep_bar_inner_id = "registration-bar-inner-card-" + card_number;
			}

			/* updates card bar */
			var card_percentage = (sessionStorage.getItem(card)/total_items_list)*100;
			document.getElementById(prep_bar_inner_id).style.width = (String(parseInt(card_percentage))+"%");
			document.getElementById(prep_bar_inner_id).style.height = "1vh";
			document.getElementById(prep_bar_inner_id).style.backgroundColor = "#FF004D";
			document.getElementById(prep_bar_inner_id).style.borderRadius = "25px";

}


