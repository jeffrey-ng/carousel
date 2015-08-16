
function onTouch(element, callback) {
  var direction = '';
  var type = '';
  var startX;
  var distX;
  var minHorizontalDistance = 150;
  var maxVerticalDistance = 100;

  var handleTouch = callback || function(event, direction, step, distance){}

  element.addEventListener('touchstart', function(touchEvent) {
    touchEvent.preventDefault();
    var touchObj = touchEvent.changedTouches[0];
    direction = '';
    step = 'start'
    distance = 0;

    startX = touchObj.pageX;

    handleTouch(touchEvent,direction,step,distance);
  }, false);

  element.addEventListener('touchmove', function(touchEvent) {
    touchEvent.preventDefault();
    var touchObj = touchEvent.changedTouches[0];
    distX = touchObj.pageX - startX;
    step ='move'
    direction = (distX < 0)? 'left':'right';
    handleTouch(touchEvent, direction,step,distX);

  }, false);

  element.addEventListener('touchend', function(touchEvent) {
    touchEvent.preventDefault();
    var touchObj = touchEvent.changedTouches[0];
    step = 'end'
    if (Math.abs(distX) >= minHorizontalDistance) {
      handleTouch(touchEvent, direction, step,distX);
    }
  }, false);


}
