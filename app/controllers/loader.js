/**
 * Obtenemos los argumentos que hayan podido ser pasador al controlador 
 */
var args = arguments[0] || {};

/**
 * Se encarga de inicializar la animacion
 */
$.start = function() {
	
	$.rocketSmoke.opacity = 0.1;
	$.rocketFlight.opacity = 0;
	$.rocketFlight.top = null;
	
	$.rocketFlight.stop();
	$.rocketSmoke.start();
	
	$.overlay.animate({
		opacity: 0.7,
		duration: 250
	});
	
	$.rocketSmoke.animate({
		opacity: 1,
		duration: 500
	});
};

/*
 * Funcion que se encarga de finalizar la animacion, sacando el cohete fuera de pantalla
 */
$.finish = function(_callback) {
	$.rocketFlight.opacity = 0.1;
	
	$.rocketFlight.start();
	
	$.rocketFlight.animate({
		opacity: 1,
		duration: 500
	});
	
	$.rocketSmoke.animate({
		opacity: 0,
		duration: 500,
		delay: 500
	}, function() {
		$.rocketSmoke.stop();
		
		$.rocketFlight.animate({
			top: -130,
			duration: 750,
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN
		});
		
		$.overlay.animate({
			opacity: 0,
			duration: 750
		}, function() {
			$.rocketFlight.stop();
			
			_callback && _callback(); //Ejecutamos los callbacks que se hayan podido pasar al finalizar la animacion, normalmente el callback sera el inicio de la aplicacion indiando que se invoque al controlador de forms
		});
	});
};
