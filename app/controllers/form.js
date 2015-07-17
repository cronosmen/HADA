/**
 *                              _                _             
 *                             | |              | |            
 *    __ _ _ __  _ __   ___ ___| | ___ _ __ __ _| |_ ___  _ __ 
 *   / _` | '_ \| '_ \ / __/ _ \ |/ _ \ '__/ _` | __/ _ \| '__|
 *  | (_| | |_) | |_) | (_|  __/ |  __/ | | (_| | || (_) | |   
 *   \__,_| .__/| .__/ \___\___|_|\___|_|  \__,_|\__\___/|_|   
 *        | |   | |                                            
 *        |_|   |_|  
 *      
 *      
 * @overview
 * This is the controller file for the Directory View. The directory view loads data from 
 * a flat file, and derives a Sectioned and Indexed (iOS) ListView displaying all contacts.
 * The Directory has two ListView Templates, one for standard contacts, the other to denote
 * that you have a marked the contact as a Bookmark (or Favorite). Also, the Directory View
 * can be filtered so that it only displays bookmarked or favorited contacts.
 *
 * @copyright
 * Copyright (c) 2014 by Appcelerator, Inc. All Rights Reserved.
 *
 * @license
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/**
 * Instantiate the local variables for this controller
 */
var _args = arguments[0] || {}, // Any passed in arguments will fall into this property
	App = Alloy.Globals.App, // reference to the APP singleton object
	users = null,  // Array placeholder for all users
	indexes = [];  // Array placeholder for the ListView Index (used by iOS only);

/**
 * Appcelerator Analytics Call
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

var questions = [{
			formFieldSet: 'Datos del paciente',
			fields: [
				{
					'label': 'Edad',
					'name': 'edad',
					'type': 'text',
					'required': true
				},
				{
					'label': 'Sexo',
					'type': 'select',
					'name': 'var_n',
					'options': [
						{'label': 'Hombre', 'value':true},
						{'label': 'Mujer', 'value': false}
					]
				}
			]
		},{
			formFieldSet: 'Sintomas del paciente',
			fields: [
				{
					'label': 'Dolor realizando esfuerzos',
					'name': 'DolorTipico',
					'type': 'select', 'options': [
						{'label': 'No', 'value': false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]
				}
			]
		},{
			formFieldSet: 'Factor de riesgo',
			fields: [
				{
					'label': 'Nivel de Creatinina',
					'type': 'text',
					'name': 'creatinina',
					'required': true
				},
				{
					'label': 'Fumador',
				 	'type': 'select',
				 	'name': 'fumador', 
				 	'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true}
					]
				},
				{
					'label': 'HTA',
					'type': 'select', 
					'name': 'hta',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]
				},
				{
					'label': 'Antecedentes de hipercolesterolemia',
					'type': 'select', 
					'name': 'antcolest',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]
				},
				{
					'label': 'Diabetes mellitus',
					'type': 'select',
					'name': 'dm',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]
				},
				{
					'label': 'Antecedentes de cardiopatía isquémica',
					'type': 'select',
					'name': 'antfam',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]		
				},
				{
					'label': 'Antecedentes de infarto de miocardio',
					'type': 'select',
					'name': 'antiam',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]				
				},
				{
					'label': 'Estenosis coronaria previa',
					'type': 'select',
					'name': 'estenosisc',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]				
				},
				{
					'label': 'Ingreso previo por insuficiencia cardíaca',
					'type': 'select',
					'name': 'anticc',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]			
				},
				{
					'label': 'ATCP previa',
					'type': 'select',
					'name': 'antactp',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]					
				},
				{
					'label': 'Cirugía coronaria previa',
					'type': 'select',
					'name': 'antcir',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]				
				},
				{
					'label': 'Arteriopatía periférica',
					'type': 'select',
					'name': 'artperif',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]				
				},
				{
					'label': 'Ictus cerebral',
					'type': 'select',
					'name': 'ictus',
					'options': [
						{'label': 'No', 'value':false},
						{'label': 'Si', 'value': true},
						{'label': 'NS', 'value': false}
					]					
				}
			]
		},{
			formFieldSet: 'Comentarios',
			fields: [
				{
					'label': 'Comentarios del cas',
					'type': 'textArea',
					'name': 'comentario',
					'required': false
				},
			]
		}
	];
/** 
 * Function to inialize the View, gathers data from the flat file and sets up the ListView
 */
function init(){
	
	
	_.each(questions, function(groupQuestionObject, id){
		
		var questionGroupContainerView = Ti.UI.createView({
			layout: 'horizontal',
			height: Ti.UI.SIZE,
		});
		
		$.wrapper.add(questionGroupContainerView);
		
		generateGroupHeader(questionGroupContainerView, groupQuestionObject, id);
		generateGroupQuestions(questionGroupContainerView, groupQuestionObject, id);
		
	});
	
	generateSendButton();
	
};

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
		
		buttonSubmit.addEventListener("click", sendForm);
}


function sendForm(){
	var httpClient = Titanium.Network.createHTTPClient();
	httpClient.open('POST', 'http://emac.uv.es/HADA/calculo_ajax.php');
  	httpClient.send(questionsResponses);
  	httpClient.onload = function(){
  		 //check the response code returned
	    if(this.status == 200)
	    {
	        checkResponse(this.responseText);	        
	    }
	 };            
	
};

function checkResponse(data){
	/** BUSCAMOS CUALQUIER CONTENIDO EN UN ELEMENTO SPAN (SOLO EXISTE UNO EN LA RESPUESTA DE LA LLAMADA )**/
	var patt = "<span(?:[^>]+class=\"(.*?)\"[^>]*)?>(.*?)<\/span>";
	var res = data.match(patt);
	alert("El resultado es: "+res[2]);
};

function generateGroupHeader(questionGroupView, groupQuestionObject, id){
	
		var groupHeaderView = Ti.UI.createView({
			backgroundColor: "#ececec",
			width: '100%',
			height: 30,
		    id: 'Group_'+id
		});
		
		questionGroupView.add(groupHeaderView);
		
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



function processQuestionResponse(name, value){
	
	questionsResponses[name] = value;
	console.log(questionsResponses);
}

/**
 * Se ejecuta al hacer un click sobre qualquier botón o al introducir texto en un textField 
 */
function buttonPressed(e, button){
	
	_.each(e.source.parent.children, function(children){
		if(e.source.id == children.id){
			children.setBackgroundColor("#CCC");
			children.setBorderColor('white');
			children.setColor("#FFF");
			processQuestionResponse(button.name, e.source.value);
		}
		else{
			children.setBackgroundColor('#FFF');
			children.setBorderColor('#336699');
			children.setColor('#CCC');	
		}

	});
		
}


function generateFieldsQuestion(container, field, groupId, questionId){
		if( field.type == 'select'){
			var fieldWidth = '40%';
			if(field.options.length==3)
				fieldWidth = '25%';
				
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
					id: groupId+'_'+questionId+'_'+optionId,
					right: 5,
					top: 5,
					name: field.name,
					parent: container,
					width: fieldWidth,
					bottom: 5,
					text: option.label,
					title: option.label
				});
				
				button.addEventListener("click", function(e){
					buttonPressed(e, button);
				});
				
				container.add(button);
				
			});			
		}
			

			
		if( field.type == 'textArea'){
			var fieldText = Ti.UI.createTextArea({
				hintText: 'Introduzca aquí sus comentarios',
				width: Ti.UI.FILL,
				height: 80,
			});
			
			container.add(fieldText);

			
			fieldText.addEventListener("change", function(e){
				processQuestionResponse(field.name, e.source.value);
			});
			
			
		}
		
		if( field.type == 'text'){
			var fieldTextArea = Ti.UI.createTextField({
				hintText: 'test',
				top: 7,
				keyboardType: "Titanium.UI.KEYBOARD_NUMBER_PAD",
				color:"#336699"
				
			});
			
			fieldTextArea.addEventListener("change", function(e){
				processQuestionResponse(field.name, e.source.value);
			});
			container.add(fieldTextArea);
		}
				
		
}

function generateGroupQuestions(questionGroupView, groupQuestionObject, groupId){
			
		_.each(groupQuestionObject.fields, function(question, questionId){
			
			var viewContainer = Ti.UI.createView({
				width: '100%',
				top: 5,
				bottom: 5,
				height: 60,
				layout: 'horizontal'
			});
				
			questionGroupView.add(viewContainer);

			if(question.type == "textArea"){
				var viewLabelContainerWidth = '0%';
				var viewButtonContainerWidth = '100%';
			}else{
				var viewLabelContainerWidth = '40%';
				var viewButtonContainerWidth = '60%';
			}
				
			var viewLabelContainer = Ti.UI.createView({
				width: viewLabelContainerWidth,
			});
			
			viewContainer.add(viewLabelContainer);
			
		
			var viewButtonContainer = Ti.UI.createView({
				width: viewButtonContainerWidth,
				background: 'red',
				layout: 'horizontal',
			});
			
			viewContainer.add(viewButtonContainer);
			
			var questionLabel =  Ti.UI.createLabel({
				left: 5,
				classes: ['title'],
				text: question.label,
				title: question.label
			});
			
			viewLabelContainer.add(questionLabel);
			
			var questionSeparator = Ti.UI.createView({
				backgroundColor: "#ececec",
				width: Ti.UI.FILL,
				height: 1,
				bottom: 0
			});
			
			questionGroupView.add(questionSeparator);
			
			generateFieldsQuestion(viewButtonContainer, question, groupId, questionId);
							
		});
						
}

/**
 * Initialize View
 */
init();