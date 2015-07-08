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
    this.__controllerPath = "directoryRow";
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
    $.__views.directoryRow = Ti.UI.createTableViewRow({
        height: 100,
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        id: "directoryRow"
    });
    $.__views.directoryRow && $.addTopLevelView($.__views.directoryRow);
    $.__views.__alloyId92 = Ti.UI.createView({
        left: 0,
        id: "__alloyId92"
    });
    $.__views.directoryRow.add($.__views.__alloyId92);
    $.__views.userPhoto = Ti.UI.createImageView({
        preventDefaultImage: true,
        border: 1,
        borderColor: "#acacac",
        height: 75,
        width: Ti.UI.SIZE,
        top: 12,
        left: 0,
        borderRadius: 35,
        id: "userPhoto"
    });
    $.__views.__alloyId92.add($.__views.userPhoto);
    $.__views.__alloyId93 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        left: 0,
        id: "__alloyId93"
    });
    $.__views.__alloyId92.add($.__views.__alloyId93);
    $.__views.userName = Ti.UI.createLabel({
        font: {
            fontSize: 20
        },
        left: 85,
        color: "#444",
        id: "userName"
    });
    $.__views.__alloyId93.add($.__views.userName);
    $.__views.userEmail = Ti.UI.createLabel({
        font: {
            fontSize: 10
        },
        left: 85,
        height: 20,
        color: "#666",
        id: "userEmail"
    });
    $.__views.__alloyId93.add($.__views.userEmail);
    $.__views.userCompany = Ti.UI.createLabel({
        font: {
            fontSize: 10
        },
        left: 85,
        height: 20,
        color: "#666",
        id: "userCompany"
    });
    $.__views.__alloyId93.add($.__views.userCompany);
    $.__views.favorite = Ti.UI.createLabel({
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        text: "",
        color: "#038BC8",
        right: 10,
        top: -2,
        id: "favorite"
    });
    $.__views.__alloyId92.add($.__views.favorite);
    $.__views.__alloyId94 = Ti.UI.createView({
        bottom: 0,
        backgroundColor: "#ececec",
        width: Ti.UI.FILL,
        height: 1,
        id: "__alloyId94"
    });
    $.__views.__alloyId92.add($.__views.__alloyId94);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.directoryRow.user = args;
    $.userPhoto.image = args.photo;
    $.userCompany.text = args.company;
    $.userEmail.text = args.email;
    $.userName.text = args.firstName + " " + args.lastName;
    $.favorite.visible = args.isBookmark;
    $.directoryRow.search = args.firstName + " " + args.lastName;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;