function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function isBookmark(id) {
        return _.find(bookmarks, function(mark) {
            return id === mark;
        });
    }
    function emailContact() {
        Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.emailButton.clicked");
        if (true && "Simulator" === Ti.Platform.model) {
            alert("Simulator does not support sending emails. Use a device instead");
            return;
        }
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.toRecipients = [ _args.email ];
        emailDialog.open();
    }
    function callContact() {
        Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.callContactButton.clicked");
        var dialog = Ti.UI.createAlertDialog({
            cancel: 0,
            buttonNames: [ "Cancel", "Ok" ],
            message: "Are you sure you want to call " + _args.firstName + " at " + _args.phone
        });
        dialog.addEventListener("click", function(e) {
            e.index !== e.source.cancel && Ti.Platform.openURL("tel:+15125551212");
        });
        dialog.show();
    }
    function toggleBookmark() {
        if (isBookmark(_args.id)) {
            Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.removeBookmark.clicked");
            bookmarks = _.difference(bookmarks, [ _args.id ]);
            $.addBookmarkBtn.setTitle("+ Add To Bookmarks");
        } else {
            Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.addBookmark.clicked");
            bookmarks.push(_args.id);
            $.addBookmarkBtn.setTitle("- Remove From Bookmarks");
        }
        Ti.App.Properties.setList("bookmarks", bookmarks);
        Ti.App.fireEvent("refresh-data");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
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
    var __defers = {};
    $.__views.profile = Ti.UI.createWindow({
        backgroundColor: "#fff",
        titleAttributes: {
            color: "#C41230"
        },
        layout: "vertical",
        theme: "Appcelerator",
        opacity: "0.0",
        title: "Profile",
        id: "profile"
    });
    $.__views.profile && $.addTopLevelView($.__views.profile);
    $.__views.contactInfo = Ti.UI.createScrollView({
        layout: "vertical",
        top: 0,
        id: "contactInfo"
    });
    $.__views.profile.add($.__views.contactInfo);
    var __alloyId4 = [];
    $.__views.mapview = (require("ti.map").createView || Ti.UI.createView)({
        top: 0,
        touchEnabled: false,
        enableZoomControls: false,
        compassEnabled: false,
        height: "30%",
        annotations: __alloyId4,
        id: "mapview"
    });
    $.__views.contactInfo.add($.__views.mapview);
    $.__views.__alloyId5 = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        top: 0,
        id: "__alloyId5"
    });
    $.__views.contactInfo.add($.__views.__alloyId5);
    $.__views.name = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        top: 10,
        font: {
            fontSize: 24
        },
        color: "#C41230",
        touchEnabled: false,
        text: "Kelly Smith",
        id: "name"
    });
    $.__views.__alloyId5.add($.__views.name);
    $.__views.job = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        font: {
            fontSize: 14
        },
        color: "#666",
        touchEnabled: false,
        text: "Account Rep",
        id: "job"
    });
    $.__views.__alloyId5.add($.__views.job);
    $.__views.company = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        font: {
            fontSize: 14
        },
        color: "#666",
        touchEnabled: false,
        text: "Appcelerator, Inc",
        id: "company"
    });
    $.__views.__alloyId5.add($.__views.company);
    $.__views.addBookmarkBtn = Ti.UI.createButton({
        top: 10,
        width: "100%",
        height: Ti.UI.SIZE,
        font: {
            fontSize: 18
        },
        title: "+ Add To Bookmarks",
        id: "addBookmarkBtn",
        textid: "bookmarkBtn"
    });
    $.__views.__alloyId5.add($.__views.addBookmarkBtn);
    toggleBookmark ? $.__views.addBookmarkBtn.addEventListener("click", toggleBookmark) : __defers["$.__views.addBookmarkBtn!click!toggleBookmark"] = true;
    $.__views.__alloyId6 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "__alloyId6"
    });
    $.__views.contactInfo.add($.__views.__alloyId6);
    $.__views.callBtn = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        text: "",
        height: 60,
        width: 60,
        color: "#C41230",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#C41230",
        backgroundColor: "#33C41230",
        textAlign: "center",
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        left: "10%",
        id: "callBtn"
    });
    $.__views.__alloyId6.add($.__views.callBtn);
    callContact ? $.__views.callBtn.addEventListener("click", callContact) : __defers["$.__views.callBtn!click!callContact"] = true;
    $.__views.emailBtn = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        text: "",
        height: 60,
        width: 60,
        color: "#C41230",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#C41230",
        backgroundColor: "#33C41230",
        textAlign: "center",
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        left: "10%",
        id: "emailBtn"
    });
    $.__views.__alloyId6.add($.__views.emailBtn);
    emailContact ? $.__views.emailBtn.addEventListener("click", emailContact) : __defers["$.__views.emailBtn!click!emailContact"] = true;
    $.__views.msgBtn = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        text: "",
        height: 60,
        width: 60,
        color: "#C41230",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#C41230",
        backgroundColor: "#33C41230",
        textAlign: "center",
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        left: "10%",
        id: "msgBtn"
    });
    $.__views.__alloyId6.add($.__views.msgBtn);
    $.__views.__alloyId7 = Ti.UI.createView({
        top: 25,
        height: 1,
        width: "90%",
        backgroundColor: "#acacac",
        id: "__alloyId7"
    });
    $.__views.contactInfo.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createView({
        layout: "vertical",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "__alloyId8"
    });
    $.__views.contactInfo.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        left: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        top: 0,
        left: 0,
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        text: "",
        color: "#C41230",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.phone = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        left: 0,
        font: {
            fontSize: 12
        },
        color: "#666",
        text: "512-555-1212",
        id: "phone"
    });
    $.__views.__alloyId9.add($.__views.phone);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        left: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "__alloyId11"
    });
    $.__views.__alloyId8.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        top: 0,
        left: 0,
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        text: "",
        color: "#C41230",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.email = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        left: 0,
        font: {
            fontSize: 12
        },
        color: "#666",
        text: "kelly.smith@appcelerator.com",
        id: "email"
    });
    $.__views.__alloyId11.add($.__views.email);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        left: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "__alloyId13"
    });
    $.__views.__alloyId8.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        top: 0,
        left: 0,
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        text: "",
        color: "#C41230",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.im = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        left: 0,
        right: 10,
        font: {
            fontSize: 12
        },
        color: "#666",
        text: "kelly.smith",
        id: "im"
    });
    $.__views.__alloyId13.add($.__views.im);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "horizontal",
        top: 10,
        left: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "__alloyId15"
    });
    $.__views.__alloyId8.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        top: 0,
        left: 0,
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        text: "",
        color: "#C41230",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.start_date = Ti.UI.createLabel({
        autoLink: Ti.UI.AUTOLINK_ALL,
        left: 0,
        right: 10,
        font: {
            fontSize: 12
        },
        color: "#666",
        text: "July 27, 2001",
        id: "start_date"
    });
    $.__views.__alloyId15.add($.__views.start_date);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var _args = arguments[0] || {}, Map = require("ti.map"), bookmarks = (require("utilities"), 
    null);
    $.name.text = _args.firstName + " " + _args.lastName;
    $.company.text = _args.company;
    $.phone.text = _args.phone;
    $.email.text = _args.email;
    $.im.text = _args.im || _args.firstName + "." + _args.lastName;
    var lat = _args.latitude;
    $.mapview.setRegion({
        latitude: lat || 30.631256,
        longitude: _args.longitude || -97.675422,
        latitudeDelta: 2,
        longitudeDelta: 2,
        zoom: 5,
        tilt: 45
    });
    var mapAnnotation = Map.createAnnotation({
        latitude: _args.latitude || 30.631256,
        longitude: _args.longitude || -97.675422,
        customView: Alloy.createController("annotation", {
            image: _args.photo
        }).getView(),
        animate: true
    });
    $.mapview.addAnnotation(mapAnnotation);
    bookmarks = Ti.App.Properties.getList("bookmarks", []);
    isBookmark(_args.id) && $.addBookmarkBtn.setTitle("- Remove From Bookmarks");
    Ti.Analytics.featureEvent(Ti.Platform.osname + ".profile.viewed");
    $.profile.addEventListener("postlayout", function() {
        $.profile.animate({
            opacity: 1,
            duration: 250,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
    });
    __defers["$.__views.addBookmarkBtn!click!toggleBookmark"] && $.__views.addBookmarkBtn.addEventListener("click", toggleBookmark);
    __defers["$.__views.callBtn!click!callContact"] && $.__views.callBtn.addEventListener("click", callContact);
    __defers["$.__views.emailBtn!click!emailContact"] && $.__views.emailBtn.addEventListener("click", emailContact);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;