
 //Instanciamos las variables locales para este controlador
 
var _args = arguments[0] || {}, //Obtenemos cualquier argumento que se haya pasado al generar la instancia del controlador
	App = Alloy.Globals.App, //Referencia al objeto singleton de APP
	indexes = [];  // Necesario para iOS para algunos elementos como listView o listItem
	
/**
 * Generamos el titulo de la pantalla y iniciamos servicio de analitica  y mandamos un page view
 */
var title = _args.title ? _args.title.toLowerCase() : "HADA";
Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".viewed");

/**
 * TODO: Make a form builder for manage questions 
 */

/**
 * @var questionResponses
 * Contiene respuestas del formulario que se añaden dinamicamente en el click o en el input de cada una. 
 */
var questionsResponses = {};

/**
 * @var questions
 * Contiene las preguntas guardadas en el archivo lib/Form/data.json 
 */
var questions;

/** 
 * Function to inialize the View, gathers data from the flat file and sets up the ListView
 */
function init(){
	
	//Accedemos al objeto Filesystem para leer los grupos de preguntas y preguntas
	var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "Form/data.json"); 
	
	/**
	 * Populamos la variable questions con los grupos de preguntas
	 */
	questions = JSON.parse(file.read().text).questions;
	
	
	//Recorremos cada grupo de preguntas con sus preguntas y propiedades
	_.each(questions, function(groupQuestionObject, id){
		
		//Para cada grupo generamos un contenedor
		var questionGroupContainerView = Ti.UI.createView({
			top: 0,
			layout: 'horizontal',
			height: Ti.UI.SIZE,
		});
		
		$.wrapper.add(questionGroupContainerView);
		//Generamos la cabecera del grupo de preguntas que mostrara el texto de cada grupo de preguntas
		generateGroupHeader(questionGroupContainerView, groupQuestionObject, id);
		
		//Generamos el cuerpo del grupo de preguntas. Cada grupo de preguntas se compone de un label y de botones o inputs
		generateGroupQuestions(questionGroupContainerView, groupQuestionObject, id);
		
	});
	
	//Inyectamos el boton de enviar
	generateSendButton();
	
};

/**
 * Este metodo se encarga del renderizado del boton de enviar y de añadir un evento al mismo para que se envie el formulario 
 */
function generateSendButton(){
		

		
		var buttonSubmit = Ti.UI.createButton({
			borderRadius: 5,
			backgroundColor: '#677AA6',
			borderColor: '#336699',
			color: 'white',
			top: 5,
			bottom: 15,
			width: 100,
			height: 50,
			title: 'Enviar',
			id: 'submitForm',
			name: 'submit',
			text: 'Enviar',
		});
				
		$.wrapper.add(buttonSubmit);
		
		//Attach de evento click sobre el boton. Cuando se haga un click se invocara al metodo sendForm encargado de enviar el formulario
		buttonSubmit.addEventListener("click", sendForm);
}

/**
 * Metodo encargado de enviar los datos del formulatio a la pagina. 
 */
function sendForm(){
	var httpClient = Titanium.Network.createHTTPClient();
	httpClient.open('POST', 'http://emac.uv.es/HADA/calculo_ajax.php');
  	httpClient.send(questionsResponses); //Enviamos el objeto que ya contiene la estructura necesaria.
  	httpClient.onload = function(){
  		 //TODO: Checkear diferentes estados
	    if(this.status == 200)
	    {
	        checkResponse(this.responseText);	        
	    }
	 };            
	
};


var onResultsClick = function onClick (e){
	
	/**
	 * Open this same controller into a new page, pass the flag to restrict the list only to favorite Contacts and force the title
	 */
	Alloy.Globals.Navigator.open("results",{displayHomeAsUp:true});
};



/**
 * Metodo encargado de procesar la respuesta del servidor al formulario enviado y mostrar el resultado. 
 */
function checkResponse(data){
	console.log("data", data);
	var regex = /<span(?:[^>]+class=\"(.*?)\"[^>]*)?>(.*?)<\/span>/g;
	var patt2 = new RegExp(regex);

	var result = patt2.exec(data);
    var reference = patt2.exec(data);
    
    var resultModel = Alloy.createModel("results", {
    	result    : 	result[2],
    	reference :     reference[2]
	});
	 
	//This is how we save a model to our databaseif the model already exists, the save will be an "update".
	resultModel.save();
	
	  var dialog = Ti.UI.createAlertDialog({
		message: 'El resultado es: '+result[2],
	ok: 'Okay',
	title: 'Resultado procesado'
	  });
	  dialog.show();

};

/**
 * @param {Object} questionGroupView Titanium.UI.View
 * @param {Object} groupQuestionObject Objeto fieldset que contiene información del grupo de preguntas además de sus fields
 * @param id {Int} identificador unico del fieldset
 */
function generateGroupHeader(questionGroupView, groupQuestionObject, id){
		
		//Generamos el contenedor del label y lo añadimos a su questionGroup
		var groupHeaderView = Ti.UI.createView({
			backgroundColor: "#ececec",
			width: '100%',
			height: 30,
		    id: 'Group_'+id
		});
		
		questionGroupView.add(groupHeaderView);
		
		//Generamos el label que contiene el titulo del grupo de preguntas
		var groupHeaderLabel = Ti.UI.createLabel({
			left: 20,
		 	font:{
		 		fontSize: 20
		 	},
		 	color: "#666",
			id: 'Title_'+id,
			text: groupQuestionObject.formFieldSet
		});
		
		groupHeaderView.add(groupHeaderLabel);
}


/**
 * Se llama cada vez que se interactua con un field. Este metodo se encarga de añadir respuestas a un hash donde la key es el name del field y el value el valor del field en el formulatio
 */
function processQuestionResponse(name, value){
	
	questionsResponses[name] = value;
	console.log(questionsResponses);
}

/**
 * Se ejecuta al hacer un click sobre qualquier botón del formulario
 */
function buttonPressed(e, button){
	
	_.each(e.source.parent.children, function(children){ //recorremos todos los hijos del padre del boton presionado
		if(e.source.id == children.id){ //si un hijo contiene el mismo id que el del boton presionado, cambiamos su estilo y procesamos su respuesta llamando a processQuestionResponse
			children.setBackgroundColor("#CCC");
			children.setBorderColor('white');
			children.setColor("#FFF");
			processQuestionResponse(button.name, e.source.value);
		}
		else{ //Reseteamos el estilo del boton si el hijo no tiene el mismo id que el boton presionado
			children.setBackgroundColor('#FFF');
			children.setBorderColor('#336699');
			children.setColor('#CCC');	
		}

	});
		
}

/**
 * @param container {Object} Contenedor del boton a generar
 * @param field {Object} Objeto field del objeto questions
 * @param groupId {Int} Identificador unico del grupo de preguntas
 * Metodo que genera los field 
 */
function generateFieldsQuestion(container, field, groupId, questionId){
		
		
		//Cada boton es un element de titanium diferente
		if( field.type == 'select'){
			var fieldWidth = '40%';
			if(field.options.length==3)
				fieldWidth = '25%'; //en caso de ser select y tener 3 opciones bajamos el with
				
			_.each(field.options, function(option, optionId){
				var button = Ti.UI.createButton({
					value: option.value,
					borderRadius: 5,
					backgroundColor: '#FFF',
					borderColor: '#336699',
					color: '#CCC',
					autoStyle: true,
					height: 'auto',
					left: 5,
					classes: ['Button'],
					id: groupId+'_'+questionId+'_'+optionId, //identificador unico formado por el identificador del grupo de preguntas, el identificador de la pregunta y el identificador del boton
					right: 5,
					top: 5,
					name: field.name,
					parent: container,
					width: fieldWidth,
					bottom: 5,
					text: option.label,
					title: option.label
				});
				
				button.addEventListener("click", function(e){ //Guardamos la respuesta en cada interaccion con el boton y generamos estilos nuevos para mostrar como activo / inactivo
					buttonPressed(e, button);
				});
				
				container.add(button);
				
			});			
		}
			

			
		if( field.type == 'textArea'){
			var fieldText = Ti.UI.createTextArea({
				hintText: 'Introduzca aquí sus comentarios',
				width: Ti.UI.FILL, //Mediante Ti.UI.FILL indicamos que el elemento debe ocupar todo el ancho disponible.
				height: 80,
			});
			
			container.add(fieldText);
		
			
			fieldText.addEventListener("change", function(e){ //Guardamos la respuesta en cada interaccion con el text
				processQuestionResponse(field.name, e.source.value);
			});
			
			
		}
		
		if( field.type == 'text'){
			var fieldTextArea = Ti.UI.createTextField({
				hintText: field.placeholder, //Placeholder con el texto de ejemplo, viene definido en la propierade placeholder del field
				top: 7,
				keyboardType: "Titanium.UI.KEYBOARD_NUMBER_PAD", //Indicamos que el layout del teclado ha de ser numerico.
				color:"#336699"
				
			});
			
			if(Ti.Platform.osname == 'iphone'){
				fieldTextArea.top = 10;
				fieldTextArea.left = 5;
			}
				
			
			fieldTextArea.addEventListener("change", function(e){
				processQuestionResponse(field.name, e.source.value);
			});
			container.add(fieldTextArea);
		}
				
		
}

/**
 * @param questionGroupView {Object} Es el contenedor del grupo de preguntas
 * @param groupQuestionObject {Object} Es el objeto que contiene las preguntas y sus propiedades
 * @param groupId {Int} Es el identificador unico del grupo de preguntas
 */
function generateGroupQuestions(questionGroupView, groupQuestionObject, groupId){
		
		//Recorremos las preguntas del grupo de preguntas y generamos su cuerpo
		_.each(groupQuestionObject.fields, function(question, questionId){
			
			//Es el contenedor de cada pregunta
			var viewContainer = Ti.UI.createView({
				width: '100%',
				top: 5,
				bottom: 5,
				height: 60,
				layout: 'horizontal'
			});
			
			if(Ti.Platform.osname == 'iphone')
				viewContainer.height = 40;
				
			questionGroupView.add(viewContainer);

			//Si es un textarea ocpara todo el ancho
			if(question.type == "textArea"){
				var viewLabelContainerWidth = '0%';
				var viewButtonContainerWidth = '100%';
			}else{ //de lo contrario simplemente emulamos un float left
				var viewLabelContainerWidth = '40%';
				var viewButtonContainerWidth = '60%';
			}
			
			//Contenedor del label de la pregunta que se inyectara en el contenedor de la pregunta
			var viewLabelContainer = Ti.UI.createView({
				width: viewLabelContainerWidth,
			});
			
			viewContainer.add(viewLabelContainer);
			
			//Contenedor de los botones o inputs tipo text
			var viewButtonContainer = Ti.UI.createView({
				width: viewButtonContainerWidth,
				background: 'red',
				layout: 'horizontal',
			});
			
			viewContainer.add(viewButtonContainer);
			
			//Label que presenta el nombre de la pregunta
			var questionLabel =  Ti.UI.createLabel({
				left: 5,
				autoStyle: true,
				classes: ['title'],
				text: question.label,
				title: question.label
			});
			
			if(Ti.Platform.osname == 'iphone'){
				questionLabel.font = {
					fontSize: 12
				};	
			}
			
			viewLabelContainer.add(questionLabel);
			
			//Incluimos un separador de 1dpi al final de cada pregunta  
			var questionSeparator = Ti.UI.createView({
				backgroundColor: "#ececec",
				width: Ti.UI.FILL,
				height: 1,
				bottom: 0
			});
			
			questionGroupView.add(questionSeparator);
			
			//Generamos los botones o inputs para cada pregunta
			generateFieldsQuestion(viewButtonContainer, question, groupId, questionId);
							
		});
						
}

/**
 * Llamamos a nuestro construct y generamos el formulario
 */
init();
