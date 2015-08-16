window.addEventListener('load', function() {
  var element = document.getElementById('gallery');
  var galleryWidth = element.offsetWidth; // Width of container. Currently set to size of images
  var imageContainer = element.getElementsByTagName('ul')[0];
  var imageCount = imageContainer.getElementsByTagName('li').length;
  var index = 0;
  var leftWall = 0; // The left x of the imageContainer
  imageContainer.style.width = galleryWidth * imageCount + 'px' // set width of container should be size of all images side by side.

  onTouch(element, function(event, direction, step, distance) {
    switch (step) {
      case 'start':
        leftWall = parseInt(imageContainer.style.left) || 0;
        break;
      case 'move':
        var fullDistance = leftWall + distance;
        imageContainer.style.left = Math.min(fullDistance, (galleryWidth) * (index + 1)) + 'px'; // Set the left to a new position. Min used for snapping animation
        break;
      case 'end':
        if (direction == 'left' || direction == 'right') {
          index = (direction == 'left') ? Math.min(index + 1, imageCount - 1) : Math.max(index - 1, 0) // Decide which image to snap to
        }
        imageContainer.style.left = -index * galleryWidth + 'px'
        break;
    }
  });
}, false);
