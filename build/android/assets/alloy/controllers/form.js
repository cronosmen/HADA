function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function init() {
        _.each(questions, function(groupQuestionObject, id) {
            var questionGroupContainerView = Ti.UI.createView({
                layout: "horizontal",
                height: Ti.UI.SIZE
            });
            $.wrapper.add(questionGroupContainerView);
            generateGroupHeader(questionGroupContainerView, groupQuestionObject, id);
            generateGroupQuestions(questionGroupContainerView, groupQuestionObject, id);
        });
        generateSendButton();
    }
    function generateSendButton() {
        var buttonSubmit = Ti.UI.createButton({
            borderRadius: 5,
            backgroundColor: "#677AA6",
            borderColor: "#336699",
            color: "white",
            top: 5,
            bottom: 15,
            width: 100,
            title: "Enviar",
            id: "submitForm",
            name: "submit",
            text: "Enviar"
        });
        $.wrapper.add(buttonSubmit);
        buttonSubmit.addEventListener("click", sendForm);
    }
    function sendForm() {
        var httpClient = Titanium.Network.createHTTPClient();
        httpClient.open("POST", "http://emac.uv.es/HADA/calculo_ajax.php");
        httpClient.send(questionsResponses);
        httpClient.onload = function() {
            if (200 == this.status) {
                var doc = this.responseXML;
                Titanium.API.log("info", "Response: " + doc);
                var result = doc.documentElement.getElementsById("contentblock").text();
                Ti.API.info("Store: " + result);
            }
        };
    }
    function generateGroupHeader(questionGroupView, groupQuestionObject, id) {
        var groupHeaderView = Ti.UI.createView({
            backgroundColor: "#ececec",
            width: "100%",
            height: 30,
            id: "Group_" + id
        });
        questionGroupView.add(groupHeaderView);
        var groupHeaderLabel = Ti.UI.createLabel({
            left: 20,
            font: {
                fontSize: 20
            },
            color: "#666",
            id: "Title_" + id,
            text: groupQuestionObject.formFieldSet
        });
        groupHeaderView.add(groupHeaderLabel);
    }
    function processQuestionResponse(name, value) {
        questionsResponses[name] = value;
        console.log(questionsResponses);
    }
    function buttonPressed(e, button) {
        _.each(e.source.parent.children, function(children) {
            if (e.source.id == children.id) {
                children.setBackgroundColor("#CCC");
                children.setBorderColor("white");
                children.setColor("#FFF");
                processQuestionResponse(button.name, e.source.value);
            } else {
                children.setBackgroundColor("#FFF");
                children.setBorderColor("#336699");
                children.setColor("#CCC");
            }
        });
    }
    function generateFieldsQuestion(container, field, groupId, questionId) {
        if ("select" == field.type) {
            var fieldWidth = "40%";
            3 == field.options.length && (fieldWidth = "25%");
            _.each(field.options, function(option, optionId) {
                var button = Ti.UI.createButton({
                    value: option.value,
                    borderRadius: 5,
                    backgroundColor: "#FFF",
                    borderColor: "#336699",
                    color: "#CCC",
                    autoStyle: true,
                    left: 5,
                    classes: [ "Button" ],
                    id: groupId + "_" + questionId + "_" + optionId,
                    right: 5,
                    top: 5,
                    name: field.name,
                    parent: container,
                    width: fieldWidth,
                    bottom: 5,
                    text: option.label,
                    title: option.label
                });
                button.addEventListener("click", function(e) {
                    buttonPressed(e, button);
                });
                container.add(button);
            });
        }
        if ("textArea" == field.type) {
            var fieldText = Ti.UI.createTextArea({
                hintText: "Introduzca aquí sus comentarios",
                width: Ti.UI.FILL,
                height: 80
            });
            container.add(fieldText);
            fieldText.addEventListener("change", function(e) {
                processQuestionResponse(field.name, e.source.value);
            });
        }
        if ("text" == field.type) {
            var fieldTextArea = Ti.UI.createTextField({
                hintText: "test",
                top: 7,
                keyboardType: "Titanium.UI.KEYBOARD_NUMBER_PAD",
                color: "#336699"
            });
            fieldTextArea.addEventListener("change", function(e) {
                processQuestionResponse(field.name, e.source.value);
            });
            container.add(fieldTextArea);
        }
    }
    function generateGroupQuestions(questionGroupView, groupQuestionObject, groupId) {
        _.each(groupQuestionObject.fields, function(question, questionId) {
            var viewContainer = Ti.UI.createView({
                width: "100%",
                top: 5,
                bottom: 5,
                height: 60,
                layout: "horizontal"
            });
            questionGroupView.add(viewContainer);
            if ("textArea" == question.type) {
                var viewLabelContainerWidth = "0%";
                var viewButtonContainerWidth = "100%";
            } else {
                var viewLabelContainerWidth = "40%";
                var viewButtonContainerWidth = "60%";
            }
            var viewLabelContainer = Ti.UI.createView({
                width: viewLabelContainerWidth
            });
            viewContainer.add(viewLabelContainer);
            var viewButtonContainer = Ti.UI.createView({
                width: viewButtonContainerWidth,
                background: "red",
                layout: "horizontal"
            });
            viewContainer.add(viewButtonContainer);
            var questionLabel = Ti.UI.createLabel({
                left: 5,
                classes: [ "title" ],
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "form";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.form = Ti.UI.createWindow({
        backgroundColor: "#fff",
        titleAttributes: {
            color: "#C41230"
        },
        modal: false,
        navBarHidden: true,
        fullscreen: true,
        title: "HADA",
        id: "form"
    });
    $.__views.form && $.addTopLevelView($.__views.form);
    $.__views.wrapper = Ti.UI.createScrollView({
        layout: "vertical",
        id: "wrapper"
    });
    $.__views.form.add($.__views.wrapper);
    exports.destroy = function() {};
    _.extend($, $.__views);
    {
        var _args = arguments[0] || {};
        Alloy.Globals.App;
    }
    var title = _args.title ? _args.title.toLowerCase() : "HADA";
    Ti.Analytics.featureEvent("android." + title + ".viewed");
    var questionsResponses = {};
    var questions = [ {
        formFieldSet: "Datos del paciente",
        fields: [ {
            label: "Edad",
            name: "edad",
            type: "text",
            required: true
        }, {
            label: "Sexo",
            type: "select",
            name: "var_n",
            options: [ {
                label: "Hombre",
                value: true
            }, {
                label: "Mujer",
                value: false
            } ]
        } ]
    }, {
        formFieldSet: "Sintomas del paciente",
        fields: [ {
            label: "Dolor realizando esfuerzos",
            name: "DolorTipico",
            type: "select",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        } ]
    }, {
        formFieldSet: "Factor de riesgo",
        fields: [ {
            label: "Nivel de Creatinina",
            type: "text",
            name: "creatinina",
            required: true
        }, {
            label: "Fumador",
            type: "select",
            name: "fumador",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            } ]
        }, {
            label: "HTA",
            type: "select",
            name: "hta",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Antecedentes de hipercolesterolemia",
            type: "select",
            name: "antcolest",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Diabetes mellitus",
            type: "select",
            name: "dm",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Antecedentes de cardiopatía isquémica",
            type: "select",
            name: "antfam",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Antecedentes de infarto de miocardio",
            type: "select",
            name: "antiam",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Estenosis coronaria previa",
            type: "select",
            name: "estenosisc",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Ingreso previo por insuficiencia cardíaca",
            type: "select",
            name: "anticc",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "ATCP previa",
            type: "select",
            name: "antactp",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Cirugía coronaria previa",
            type: "select",
            name: "antcir",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Arteriopatía periférica",
            type: "select",
            name: "artperif",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        }, {
            label: "Ictus cerebral",
            type: "select",
            name: "ictus",
            options: [ {
                label: "No",
                value: false
            }, {
                label: "Si",
                value: true
            }, {
                label: "NS",
                value: false
            } ]
        } ]
    }, {
        formFieldSet: "Comentarios",
        fields: [ {
            label: "Comentarios del cas",
            type: "textArea",
            name: "comentario",
            required: false
        } ]
    } ];
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;