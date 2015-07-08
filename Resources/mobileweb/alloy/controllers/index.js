function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        titleAttributes: {
            color: "#C41230"
        },
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId72 = Alloy.createController("form", {
        id: "__alloyId72"
    });
    $.__views.nav = Ti.UI.MobileWeb.createNavigationGroup({
        backgroundColor: "#fff",
        window: $.__views.__alloyId72.getViewEx({
            recurse: true
        }),
        id: "nav"
    });
    $.__views.index.add($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.Navigator = {
        navGroup: $.nav,
        open: function(controller, payload) {
            var win = Alloy.createController(controller, payload || {}).getView();
            $.nav.open(win);
        }
    };
    var loadingView = Alloy.createController("loader");
    loadingView.getView().open();
    loadingView.start();
    setTimeout(function() {
        loadingView.finish(function() {
            $.index.open();
            loadingView.getView().close();
            loadingView = null;
        });
    }, 1500);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;