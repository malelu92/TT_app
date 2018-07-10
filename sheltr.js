

/*function handleGesture() {
    if (touchendX <= touchstartX) {
        console.log('Swiped left');
    }
    
    if (touchendX >= touchstartX) {
        console.log('Swiped right');
    }
    
    if (touchendY <= touchstartY) {
        console.log('Swiped up');
    }
    
    if (touchendY >= touchstartY) {
        console.log('Swiped down');
    }
    
    if (touchendY === touchstartY) {
        console.log('Tap');
    }
}*/




$(document).ready(function() {



/*let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const gestureZone = document.getElementById('evacuation-plan');
console.log(gestureZone)*/
/*gestureZone.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

gestureZone.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); */




/* Only load if evacuation screen */
	if(document.getElementById("map")) {
		var el = document.getElementById('swipezone');
		swipedetect(el, function(swipedir){
    // swipedir contains either "none", "left", "right", "top", or "down"
    /*if (swipedir == "left") {
    	document.getElementById('teste').innerHTML("esq")
    	document.getElementById("evacuation-plan").style.marginLeft("-20px")
    }    
    if (swipedir == "right") {
    	document.getElementById('teste').innerHTML("dir")
    	document.getElementById("evacuation-plan").style.marginLeft("40px")
    }*/
    if (swipedir == "up") {
    	console.log("up")
    }
    el.innerHTML = 'Swiped <span style="color:yellow">' + swipedir +'</span>';
});
		console.log("antes mapa")
		initMap();
			console.log("depois mapa")
	}

	/* Only load if preparation screen */
	if(document.getElementById("prep-card-1")) {
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
	}

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

	var map;
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







// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback){

		console.log("entrou")
  
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




















