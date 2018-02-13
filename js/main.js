// Rei Yoshizawa 12/2/2018
var panel = [];
var starX = 200;
var starY = 200;
var clear = 0;

// clear
function gameClear(){
  for(i=0; i<9; i++) {
    var x = parseInt($('#'+i).css('left'))/100;
    var y = parseInt($('#'+i).css('top'))/100;
    var clearX = i%3;
    var clearY = Math.floor(i/3)
    if((clearX == x)&&(clearY == y)) {
      clear ++;
    }
  }
  if(8 <= clear) {
    $(end).removeClass('unvisible');
    endTime();
  } else {
    clear = 0;
  }
}

$(function(){
  for(i=0; i<8; i++) {
    panel.push(i)
  };
  for(i=0; i<8; i++) {
    var x = i%3*100;
    var y =  Math.floor(i/3)*100;
    $("#"+panel[i]).css({'left':x, 'top':y});
  }
  $("#puzzle").append("<li id='9'></li>");
  $("#9").css({'left':starX, 'top':starY});

  // puzzle click
  $('#puzzle li').on('click', function() {
    var idX = parseInt($(this).css('left'));
    var idY = parseInt($(this).css('top'));
    if( ((idX==starX)&&((idY==starY-100)||(idY==starY+100))) || ((idY==starY)&&((idX==starX-100)||(idX==starX+100))) ) {  //クリックしたパネルが★と隣接していれば…
      $(this).css({'left':starX, 'top':starY});
      $("#9").css({'left':idX, 'top':idY});
      $(this).addClass('colorGreen');
      starX = idX;
      starY = idY;
    }
    gameClear();
  });

  $('#puzzle li').on('mouseover', function() {
    var idX = parseInt($(this).css('left'));
    var idY = parseInt($(this).css('top'));
    if( ((idX==starX)&&((idY==starY-100)||(idY==starY+100))) || ((idY==starY)&&((idX==starX-100)||(idX==starX+100))) ) {  //クリックしたパネルが★と隣接していれば…
      $(this).addClass('colorGreen');
    } else {
      $(this).addClass('colorRed');
    }
  });

  $('#puzzle li').on('mouseleave', function() {
    var idX = parseInt($(this).css('left'));
    var idY = parseInt($(this).css('top'));
    if( ((idX==starX)&&((idY==starY-100)||(idY==starY+100))) || ((idY==starY)&&((idX==starX-100)||(idX==starX+100))) ) {  //クリックしたパネルが★と隣接していれば…
      $(this).removeClass('colorGreen');
    } else {
      $(this).removeClass('colorRed');
    }
  });
});

// every time you click puzzle it counts up number
var puzzleMove = document.getElementById( "puzzle" );
puzzleMove.onclick = function(){
    countUp();
};

var $count = 0;
function countUp() {
    document.getElementById( "movesNum" ).innerHTML = ++$count;
}

// Start Time
function startTime(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var start = document.getElementById('start');
  start.textContent = "Start Time : " + hours + ":" + minutes + ":" + seconds;
};
startTime();

// End Time
function endTime(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var end = document.getElementById('end');
  end.textContent = "End Time : " + hours + ":" + minutes + ":" + seconds;
};

// End Time is not shown before the puzzle is solved
var end = document.getElementById("end");
$(end).addClass('unvisible');
