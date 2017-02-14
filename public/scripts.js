window.addEventListener("load", function() {
	document.getElementsByClassName("waldo")[0].addEventListener("click", findClickLocation);
});

var x = 0;
var y = 0;

function findClickLocation(event) {
	var click_event = window.event;
	x = click_event.offsetX?(click_event.offsetX):click_event.pageX-document.getElementsByClassName("waldo").offsetLeft;
	y = click_event.offsetY?(click_event.offsetY):click_event.pageY-document.getElementsByClassName("waldo").offsetTop;
	event.preventDefault();
	sendData();
}

function closeModalWindow() {
	document.getElementsByClassName("modal")[0].style.display = "none";
	document.getElementsByClassName("modal_content")[0].style.display = "none";
}

function sendData() {
	httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', '/test');
	var params_x = encodeURIComponent(x);
	var params_y = encodeURIComponent(y);
	var params = params_x + " " + params_y;
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.send(params);
	getData();
}

function getData() {
	httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', '/return')
	httpRequest.onload = function() {
		var waldo_test = httpRequest.responseText
		if (waldo_test == "true") {
			document.getElementsByClassName("not_yet")[0].style.display = "none";
			document.getElementsByClassName("modal")[0].style.display = "block";
			document.getElementsByClassName("modal_content")[0].style.display = "block";
			document.getElementsByClassName("modal_title")[0].textContent = "You found him!";
			clearInterval(current_timer);
			final_minutes = document.getElementsByClassName("minutes")[0].textContent;
			final_seconds = document.getElementsByClassName("seconds")[0].textContent;
			document.getElementsByClassName("modal_body")[0].textContent = "Your final time was " + final_minutes + " minutes and " + final_seconds + " seconds.";
			document.getElementsByClassName("submit_score")[0].addEventListener("click", function() {
				winner_name = document.getElementsByClassName("winner_name")[0].value;
				storeScores(winner_name, final_minutes, final_seconds);
			});
		} else if (waldo_test == "false") {
			document.getElementsByClassName("not_yet")[0].style.display = "block";
			setTimeout(resetResponseError, 2000);
			function resetResponseError() {
				document.getElementsByClassName("not_yet")[0].style.display = "none";
			}
	}
	}
	httpRequest.send();
}

var current_timer = "";

function timer() {
	var sec = 0;
	function pad(val) { 
		return val > 9 ? val : "0" + val; 
	}
	current_timer = setInterval( function(){
    	document.getElementsByClassName("seconds")[0].textContent=pad(++sec%60);
    	document.getElementsByClassName("minutes")[0].textContent=pad(parseInt(sec/60,10));
		}, 1000);
}

timer();

function storeScores(name, minutes, seconds) {
	httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', '/storescores');
	var name = encodeURIComponent(name)
	var mins = encodeURIComponent(minutes);
	var secs = encodeURIComponent(seconds);
	var params = name + " " + mins + " " + secs;
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.send(params);
}