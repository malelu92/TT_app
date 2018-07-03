$(document).ready(function() {
	$("#prep-card-1").click(function(){
		console.log("lala")
		var list = $("<div class='preparation-list-background'><div class='betterDisplay'></div>");
		console.log("lele")
    $("body").append(list);
    /*$(".betterDisplay").text(screen_text);*/
	});
});