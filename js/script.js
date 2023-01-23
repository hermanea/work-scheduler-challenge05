$(function () {
  // Event listener to save user input in local storage.
  var hourblocksString = localStorage.getItem("hourblocks")
  var hourblocks = JSON.parse(hourblocksString) || [];

  var saveBtns = $('.saveBtn');
  for(var i = 0; i < saveBtns.length; i++){
    saveBtns[i].addEventListener("click", function() {
      var newhourblock = {
        id: $(this).parent().attr('id'), 
        text: $(this).siblings("textarea").val(),
      }
      hourblocks.push(newhourblock)

      localStorage.setItem("hourblocks", JSON.stringify(hourblocks))
    })
  }

  // Applies the whichever time class is relevant to the corresponding block, depending on current state.
  var hourblockEl = document.getElementById("hourblocks").children;
  var now = "hour-"+dayjs().format("HH");

  for(var i = 0; i < hourblockEl.length; i++) {
    if(hourblockEl[i].getAttribute("id") === now) {
      hourblockEl[i].setAttribute("class", "row time-block present")
    } else if(hourblockEl[i].getAttribute("id") < now) {
      hourblockEl[i].setAttribute("class", "row time-block past")
    } else {
      hourblockEl[i].setAttribute("class", "row time-block future")
    }
  }

  // Gets any user input that was saved in localStorage and sets the values of the correspingind textarea elements.
  for(var i = 0; i < hourblocks.length; i++){
    for(var j = 0; j < hourblockEl.length; j++){
      if(hourblocks[i].id === hourblockEl[j].getAttribute("id")) {
        hourblockEl[j].children[1].textContent = hourblocks[i].text;
      }
    }
  }

  // Displays current date in header.
  var today = dayjs().format("dddd, MMM D, YYYY")
  document.getElementById("currentDay").textContent = today;
  
});
