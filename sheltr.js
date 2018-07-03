$(document).ready(function() {
	$("#prep-card-1").click(function(){
		var list = $("<div class='preparation-list-background'><div class='preparation-list'></div>");
    $("body").append(list);
    var content = $("<div>\
    									<div id='prep-list-1-close' onclick='closePrepList()' class='col-12'>close</div>\
    									<label class='container'>\
    										<div class='col-12'>Marina\
    										<input type='checkbox'>\
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
	});
});


function closePrepList() {
	$(".preparation-list-background").remove();
}