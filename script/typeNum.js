var has_str_reg = new RegExp('[^0-9]','g');

function checkNumber(input) {
    var $input = $(input);
    var raw_val = $input.val();

    var tip = $input.next().length > 0 ? $input.next() : $("<span class='tip'></span>").appendTo($input.parent())
    tip.css({ "left": "-" + $input.css("width") });

    if (has_str_reg.test(raw_val)){
      tip.html("tip:必须为数字").css("display", "inline-block").fadeOut(1500)
      return false   
    }
    var min = parseInt($input.attr("min"));
    var step = parseInt($input.attr("step"));
    var val =  raw_val == "" ? 0 : parseInt(raw_val);  

    if ( min && ( val < min )){
      tip.html("至少为" + min).css("display", "inline-block").fadeOut(1500)
      return false
    }
    if (min && step && val > min && ((( val - min ) % step) > 0)) {
      tip.html("必须以" + step + "加减").css("display", "inline-block").fadeOut(1500)
      return false
    }
    return true
};

$(function(){
  // check mobile browser
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)  ) {

      $("form").on("submit", function(){
        inputs = $(this).find("input[type=number]");
        for (var i = 0; i < inputs.length; i++)  {
          if (!checkNumber(inputs[i])){
            return false
          }
        }
      })

  }

})
