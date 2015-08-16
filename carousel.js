
function onTouch(element, callback) {
  var direction = '';
  var startX;
  var distX;
  var minHorizontalDistance = 150;

  var handleTouch = callback || function(event, direction, step, distance){}

  element.addEventListener('touchstart', function(touchEvent) {
    touchEvent.preventDefault(); //Prevent defaults. Needed b/c defaults may have adverse effects. etc. swiping whole screen
    var touchObj = touchEvent.changedTouches[0]; //From list of touches.
    direction = '';
    step = 'start'
    distance = 0; //reset distance
    startX = touchObj.pageX; //reference of start location
    handleTouch(touchEvent,direction,step,distance);
  }, false);

  element.addEventListener('touchmove', function(touchEvent) {
    touchEvent.preventDefault();
    var touchObj = touchEvent.changedTouches[0];
    distX = touchObj.pageX - startX; //Distance traveled horizontally
    step ='move'
    direction = (distX < 0)? 'left':'right'; //Decide which direction swipe is going
    handleTouch(touchEvent, direction,step,distX);

  }, false);

  element.addEventListener('touchend', function(touchEvent) {
    touchEvent.preventDefault();
    var touchObj = touchEvent.changedTouches[0];
    step = 'end'
    if (Math.abs(distX) >= minHorizontalDistance) { //Only consider it a complete swipe if passes minimal horizontal distance
      handleTouch(touchEvent, direction, step,distX);
    }
  }, false);


}
