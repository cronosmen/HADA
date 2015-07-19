/**
 * Manejador de navegacion global
 */
Alloy.Globals.Navigator = {
	
	/**
	 * Manejador de navegacion de la aplicacion
	 */
	navGroup: $.nav,
	
	/**
	 * Funcion encargada de abrir una nueva pantalla. En ella se maneja la navegacion para todos los sistemas
	 * @param {Object} controller
	 * @param {Object} payload
	 */
	open: function(controller, payload){
		
		//Obtenemos la vista del controlador a mostrar
		var win = Alloy.createController(controller, payload || {}).getView();
		
		//En ios se utiliza el tabgroup y el metodo openWindow
		if(OS_IOS){
			$.nav.openWindow(win);
		}
		else if(OS_MOBILEWEB){
			$.nav.open(win); //En caso de utilizar mobileweb se usaria el meotodo open
		}
		else { //En caso de ser Android tenemos que preparar el action bar (Android utiliza un sistema de navegacion mediante el action bar (Situado en el top de la ventana)
			
			// Se añade esta propiedad para saber si el window a abrir es una ventana hija
			if (payload.displayHomeAsUp){
				
				win.addEventListener('open',function(evt){
					var activity=win.activity;
					activity.actionBar.displayHomeAsUp=payload.displayHomeAsUp;
					activity.actionBar.onHomeIconItemSelected=function(){
						evt.source.close();
					};
				});
			}
			win.open();
		}
	}
};


if(OS_IOS){ //En caso de ser ios utilizamos el meotodo open ya que para la nevagacion se utiliza un tabgroup
	$.nav.open()
}
else if(OS_MOBILEWEB){ //Si utilizaramos mobile web, primero capturamos la ventana con $.index y luego llamamos al metodo open de titanium
	$.index.open();
}
else{
	$.index.getView().open(); //En caso de android capturamos la vista actual mediante $.index.getView y llamamos al metodo open de titanium
} 