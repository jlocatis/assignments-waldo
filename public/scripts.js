// On window load, will add the event listener to the Waldo image.
window.addEventListener("load", function() {
	document.getElementsByClassName("waldo")[0].addEventListener("click", findClickLocation);
	document.getElementsByClassName("show_scores")[0].addEventListener("click", showScores);
	document.getElementsByClassName("show_scores")[1].addEventListener("click", showScores);
});

// Sets the x and y variables to be used for determining the click location to zero.
var x = 0;
var y = 0;

// Determines the x and y coordinates of the user's click within the Waldo image. Sends those coordinates to the function getData.
function findClickLocation(event) {
	var click_event = window.event;
	x = click_event.offsetX?(click_event.offsetX):click_event.pageX-document.getElementsByClassName("waldo").offsetLeft;
	y = click_event.offsetY?(click_event.offsetY):click_event.pageY-document.getElementsByClassName("waldo").offsetTop;
	getData();
}

// Sends x and y into ruby to check if the click location is valid. Ruby will return true or false as a string.
// If true is returned it will show the game over modal window, allowing you the chance to save your score with your name.
// If false is returned a "not yet" message is displayed at the bottom of the page for five seconds.
function getData() {
	httpRequest = new XMLHttpRequest();
	var coordinates = "x=" + x + "&y=" + y;
	httpRequest.open('GET', '/return?' + coordinates)
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.onreadystatechange = function() {
		// var waldo_test = httpRequest.responseText
		if (httpRequest.responseText == "true") {
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
		} else if (httpRequest.responseText == "false") {
			document.getElementsByClassName("not_yet")[0].style.display = "block";
			setTimeout(resetResponseError, 5000);
			function resetResponseError() {
				document.getElementsByClassName("not_yet")[0].style.display = "none";
			}
	}
	}
	httpRequest.send();
}

// Runs the time for scoring purposes. Time begins on page load. The below function runs every second.
// Each second it will update the text content of the timer on the page.
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

// Sends the final time and the user's name to ruby for storage in the saved scores file.
// function storeScores(name, minutes, seconds) {
// 	httpRequest = new XMLHttpRequest();
// 	var params = "name=" + name + "&mins=" + minutes + "&secs=" + seconds;
// 	httpRequest.open('GET', '/storescores?' + params);
// 	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	httpRequest.send();
// }

function storeScores(name, minutes, seconds) {
	httpRequest = new XMLHttpRequest();
	var params = "name=" + name + "&mins=" + minutes + "&secs=" + seconds;
	httpRequest.open('POST', '/storescores?' + params);
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpRequest.send();
	event.stopImmediatePropagation();
}

function showScores() {
	clearInterval(current_timer);
	document.getElementsByClassName("modal")[0].addEventListener("click", function(){
		window.location.href = "/";
	});
	document.getElementsByClassName("modal")[0].style.display = "block";
	document.getElementById("score_modal").style.display = "block";
	document.getElementsByClassName("modal_body")[0].style.display = "none";
	xhr = new XMLHttpRequest();
	xhr.open('GET', '/showscores');
	xhr.onreadystatechange = function() {
		document.getElementById("score_body").innerHTML = xhr.responseText
	}
	xhr.send();
}