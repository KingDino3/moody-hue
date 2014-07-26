define(["kinetic"],
	function(){
		
		methods.init();

		return canvas;
	}
);

var canvas = {};

var methods = {
	init : function(){
      canvas.stage = new Kinetic.Stage({
        container: "renderBox",
        width: 850,
        height: 500
      });

      canvas.layer = new Kinetic.Layer();
      canvas.stage.add(canvas.layer);
    }
};