// Reference: Dr. Kent Jones

(function($){
  // Initial speed and position of background
  var position = 0;   
  var speed = 8;      
  
  // Use jQuery to get the background element
  var $background = $("#sandyRoad");  
  
  // IFFY function to figure out best animation function and store it
  var requestAnimFrame = ( function() {
    if (window.requestAnimationFrame) return window.requestAnimationFrame;
    else return  function( callback, element ){
        window.setTimeout(callback, element);
    };
  })();

  // Callback function to move the background 
  function draw() {
    // request another animation frame
    requestAnimFrame(draw);
    // reset position to 0 once the image has scrolled far enough
    if ( position < -$background.width() ) {
        position = 0;
    }
    // Set actual background position 
    $('#sandyRoad').css('background-position',position );
    
    // Update the background position by the speed
    position = position - speed;
  }
  // Start the animation
  draw();
  
})(jQuery);