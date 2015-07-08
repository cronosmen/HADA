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
        var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "userData/data.json");
        users = JSON.parse(file.read().text).users;
        var questions = [ {
            formFieldSet: "Datos del paciente",
            fields: {
                edad: {
                    label: "Edad",
                    type: "text",
                    required: true
                },
                sexo: {
                    label: "Sexo",
                    type: "select",
                    options: [ {
                        label: "Hombre",
                        value: "hombre"
                    }, {
                        label: "Mujer",
                        value: "mujer"
                    } ]
                }
            }
        }, {
            formFieldSet: "Sintomas del paciente",
            fields: {
                "Dolor relacionado con el esfuerzo": {
                    label: "Dolor relacionado con el esfuerzo",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "no"
                    }, {
                        label: "Si",
                        value: "si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                }
            }
        }, {
            formFieldSet: "Factor de riesgo",
            fields: {
                "Nivel de Creatinina": {
                    label: "Nivel de Creatinina",
                    type: "text",
                    required: true
                },
                Fumador: {
                    label: "Fumador",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    } ]
                },
                HTA: {
                    label: "HTA",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Antecedentes de hipercolesterolemia": {
                    label: "Antecedentes de hipercolesterolemia",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Diabetes mellitus": {
                    label: "Diabetes mellitus",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Antecedentes familiares de cardiopatía isquémica": {
                    label: "Antecedentes familiares de cardiopatía isquémica",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Antecedentes de infarto de miocardio": {
                    "Antecedentes de infarto de miocardio": "label",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Estenosis coronaria previa": {
                    label: "Estenosis coronaria previa",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Ingreso previo por insuficiencia cardíaca": {
                    label: "Ingreso previo por insuficiencia cardíaca",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "ATCP previa": {
                    label: "ATCP previa",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Cirugía coronaria previa": {
                    label: "Cirugía coronaria previa",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Arteriopatía periférica": {
                    label: "Arteriopatía periférica",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                },
                "Ictus cerebral": {
                    label: "Ictus cerebral",
                    type: "select",
                    options: [ {
                        label: "No",
                        value: "No"
                    }, {
                        label: "Si",
                        value: "Si"
                    }, {
                        label: "NS",
                        value: "ns"
                    } ]
                }
            }
        }, {
            formFieldSet: "Comentarios",
            fields: {
                "Comentarios del caso": {
                    label: "Comentarios del cas",
                    type: "textArea",
                    required: false
                }
            }
        } ];
        console.log("questions", questions, "end questions");
        indexes = [];
        var sections = [];
        _.each(questions, function(question) {
            var dataToAdd = preprocessForListView(question.fields);
            if (dataToAdd.length < 1) return;
            indexes.push({
                index: indexes.length,
                title: "test"
            });
            var sectionHeader = Ti.UI.createView({
                backgroundColor: "#ececec",
                width: Ti.UI.FIll,
                height: 30
            });
            var sectionLabel = Ti.UI.createLabel({
                text: question.formFieldSet,
                left: 20,
                font: {
                    fontSize: 20
                },
                color: "#666"
            });
            sectionHeader.add(sectionLabel);
            var section = Ti.UI.createListSection({
                headerView: sectionHeader
            });
            section.items = dataToAdd;
            sections.push(section);
        });
        $.listView.sections = sections;
        _args.title && ($.wrapper.title = _args.title);
        _args.restrictBookmarks && false;
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
    $.__views.wrapper = Ti.UI.createWindow({
        backgroundColor: "#fff",
        titleAttributes: {
            color: "#C41230"
        },
        layout: "vertical",
        id: "wrapper",
        title: "HADA"
    });
    $.__views.wrapper && $.addTopLevelView($.__views.wrapper);
    var __alloyId1 = {};
    var __alloyId3 = [];
    var __alloyId5 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId6 = [];
            var __alloyId8 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId9 = [];
                    var __alloyId11 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId12 = [];
                            var __alloyId13 = {
                                type: "Ti.UI.Label",
                                bindId: "fieldLabel",
                                properties: {
                                    font: {
                                        fontSize: 14
                                    },
                                    left: 5,
                                    color: "#444",
                                    bindId: "fieldLabel"
                                }
                            };
                            __alloyId12.push(__alloyId13);
                            return __alloyId12;
                        }(),
                        properties: {
                            width: "50%"
                        }
                    };
                    __alloyId9.push(__alloyId11);
                    var __alloyId15 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId16 = [];
                            var __alloyId18 = {
                                type: "Ti.UI.TextField",
                                properties: {
                                    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                                    width: Ti.UI.FILL,
                                    backgroundColor: "red",
                                    color: "#336699",
                                    hintText: "18"
                                }
                            };
                            __alloyId16.push(__alloyId18);
                            return __alloyId16;
                        }(),
                        properties: {
                            layout: "horizontal",
                            width: "50%"
                        }
                    };
                    __alloyId9.push(__alloyId15);
                    return __alloyId9;
                }(),
                properties: {
                    layout: "horizontal",
                    width: "100%"
                }
            };
            __alloyId6.push(__alloyId8);
            var __alloyId20 = {
                type: "Ti.UI.View",
                properties: {
                    bottom: 0,
                    backgroundColor: "#ececec",
                    width: Ti.UI.FILL,
                    height: 1
                }
            };
            __alloyId6.push(__alloyId20);
            return __alloyId6;
        }(),
        properties: {
            left: 0,
            width: "100%"
        }
    };
    __alloyId3.push(__alloyId5);
    var __alloyId2 = {
        properties: {
            height: 100,
            width: Ti.UI.FILL,
            name: "textTemplate"
        },
        childTemplates: __alloyId3
    };
    __alloyId1["textTemplate"] = __alloyId2;
    var __alloyId22 = [];
    var __alloyId24 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId25 = [];
            var __alloyId27 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId28 = [];
                    var __alloyId30 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId31 = [];
                            var __alloyId32 = {
                                type: "Ti.UI.Label",
                                bindId: "fieldLabel",
                                properties: {
                                    font: {
                                        fontSize: 14
                                    },
                                    left: 5,
                                    color: "#444",
                                    bindId: "fieldLabel"
                                }
                            };
                            __alloyId31.push(__alloyId32);
                            return __alloyId31;
                        }(),
                        properties: {
                            width: "40%"
                        }
                    };
                    __alloyId28.push(__alloyId30);
                    var __alloyId34 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId35 = [];
                            var __alloyId36 = {
                                type: "Ti.UI.Button",
                                bindId: "button1",
                                properties: {
                                    bindId: "button1",
                                    height: "50"
                                }
                            };
                            __alloyId35.push(__alloyId36);
                            var __alloyId37 = {
                                type: "Ti.UI.Button",
                                bindId: "button2",
                                properties: {
                                    bindId: "button2",
                                    height: "50"
                                }
                            };
                            __alloyId35.push(__alloyId37);
                            return __alloyId35;
                        }(),
                        properties: {
                            layout: "horizontal",
                            width: "60%"
                        }
                    };
                    __alloyId28.push(__alloyId34);
                    return __alloyId28;
                }(),
                properties: {
                    layout: "horizontal",
                    width: "100%"
                }
            };
            __alloyId25.push(__alloyId27);
            var __alloyId39 = {
                type: "Ti.UI.View",
                properties: {
                    bottom: 0,
                    backgroundColor: "#ececec",
                    width: Ti.UI.FILL,
                    height: 1
                }
            };
            __alloyId25.push(__alloyId39);
            return __alloyId25;
        }(),
        properties: {
            left: 0,
            width: "100%"
        }
    };
    __alloyId22.push(__alloyId24);
    var __alloyId21 = {
        properties: {
            height: 100,
            width: Ti.UI.FILL,
            name: "selectTwoTemplate"
        },
        childTemplates: __alloyId22
    };
    __alloyId1["selectTwoTemplate"] = __alloyId21;
    var __alloyId41 = [];
    var __alloyId43 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId44 = [];
            var __alloyId46 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId47 = [];
                    var __alloyId49 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId50 = [];
                            var __alloyId51 = {
                                type: "Ti.UI.Label",
                                bindId: "fieldLabel",
                                properties: {
                                    font: {
                                        fontSize: 14
                                    },
                                    left: 5,
                                    color: "#444",
                                    bindId: "fieldLabel"
                                }
                            };
                            __alloyId50.push(__alloyId51);
                            return __alloyId50;
                        }(),
                        properties: {
                            width: "40%"
                        }
                    };
                    __alloyId47.push(__alloyId49);
                    var __alloyId53 = {
                        type: "Ti.UI.View",
                        childTemplates: function() {
                            var __alloyId54 = [];
                            var __alloyId55 = {
                                type: "Ti.UI.Button",
                                bindId: "button4",
                                properties: {
                                    bindId: "button4",
                                    height: "50"
                                }
                            };
                            __alloyId54.push(__alloyId55);
                            var __alloyId56 = {
                                type: "Ti.UI.Button",
                                bindId: "button5",
                                properties: {
                                    bindId: "button5",
                                    height: "50"
                                }
                            };
                            __alloyId54.push(__alloyId56);
                            var __alloyId57 = {
                                type: "Ti.UI.Button",
                                bindId: "button6",
                                properties: {
                                    bindId: "button6",
                                    height: "50"
                                }
                            };
                            __alloyId54.push(__alloyId57);
                            return __alloyId54;
                        }(),
                        properties: {
                            layout: "horizontal",
                            width: "60%"
                        }
                    };
                    __alloyId47.push(__alloyId53);
                    return __alloyId47;
                }(),
                properties: {
                    layout: "horizontal",
                    width: "100%"
                }
            };
            __alloyId44.push(__alloyId46);
            var __alloyId59 = {
                type: "Ti.UI.View",
                properties: {
                    bottom: 0,
                    backgroundColor: "#ececec",
                    width: Ti.UI.FILL,
                    height: 1
                }
            };
            __alloyId44.push(__alloyId59);
            return __alloyId44;
        }(),
        properties: {
            left: 0,
            width: "100%"
        }
    };
    __alloyId41.push(__alloyId43);
    var __alloyId40 = {
        properties: {
            height: 100,
            width: Ti.UI.FILL,
            name: "selectThreeTemplate"
        },
        childTemplates: __alloyId41
    };
    __alloyId1["selectThreeTemplate"] = __alloyId40;
    var __alloyId61 = [];
    var __alloyId63 = {
        type: "Ti.UI.View",
        childTemplates: function() {
            var __alloyId64 = [];
            var __alloyId66 = {
                type: "Ti.UI.View",
                childTemplates: function() {
                    var __alloyId67 = [];
                    var __alloyId69 = {
                        type: "Ti.UI.TextArea",
                        properties: {}
                    };
                    __alloyId67.push(__alloyId69);
                    return __alloyId67;
                }(),
                properties: {
                    layout: "horizontal",
                    width: "100%"
                }
            };
            __alloyId64.push(__alloyId66);
            var __alloyId71 = {
                type: "Ti.UI.View",
                properties: {
                    bottom: 0,
                    backgroundColor: "#ececec",
                    width: Ti.UI.FILL,
                    height: 1
                }
            };
            __alloyId64.push(__alloyId71);
            return __alloyId64;
        }(),
        properties: {
            left: 0,
            width: "100%"
        }
    };
    __alloyId61.push(__alloyId63);
    var __alloyId60 = {
        properties: {
            height: 100,
            width: Ti.UI.FILL,
            name: "selectTextAreaTemplate"
        },
        childTemplates: __alloyId61
    };
    __alloyId1["selectTextAreaTemplate"] = __alloyId60;
    $.__views.listView = Ti.UI.createListView({
        tintColor: "#666",
        templates: __alloyId1,
        width: "100%",
        id: "listView",
        defaultItemTemplate: "textTemplate"
    });
    $.__views.wrapper.add($.__views.listView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var _args = arguments[0] || {}, users = (Alloy.Globals.App, null), indexes = [];
    var title = _args.title ? _args.title.toLowerCase() : "directory";
    Ti.Analytics.featureEvent("mobileweb." + title + ".viewed");
    var preprocessForListView = function(fields) {
        return _.map(fields, function(field) {
            if ("text" == field.type) return {
                template: "textTemplate",
                properties: {
                    height: 50
                },
                fieldLabel: {
                    text: field.label
                }
            };
            if ("select" == field.type) {
                console.log("fields options", field.options);
                console.log("length", field.options.length);
                return 2 == field.options.length ? {
                    template: "selectTwoTemplate",
                    properties: {
                        height: 50
                    },
                    fieldLabel: {
                        text: field.label
                    },
                    button1: {
                        title: field.options[0].label
                    },
                    button2: {
                        left: 10,
                        title: field.options[1].label
                    }
                } : {
                    template: "selectThreeTemplate",
                    properties: {
                        height: 50
                    },
                    fieldLabel: {
                        text: field.label
                    },
                    button4: {
                        title: field.options[0].label
                    },
                    button5: {
                        left: 10,
                        title: field.options[1].label
                    },
                    button6: {
                        left: 10,
                        title: field.options[2].label
                    }
                };
            }
            return {
                template: "selectTextAreaTemplate",
                properties: {},
                fieldLabel: {
                    text: field.label
                }
            };
        });
    };
    $.wrapper.addEventListener("open", function() {
    });
    Ti.App.addEventListener("refresh-data", function() {
        init();
    });
    init();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;