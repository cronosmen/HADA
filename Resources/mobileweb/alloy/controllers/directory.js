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
        users = _.sortBy(users, function(user) {
            return user.lastName;
        });
        if (users) {
            indexes = [];
            var sections = [];
            var userGroups = _.groupBy(users, function(item) {
                return item.lastName.charAt(0);
            });
            _.each(userGroups, function(group) {
                var dataToAdd = preprocessForTableView(group);
                if (dataToAdd.length < 1) return;
                indexes.push({
                    index: indexes.length,
                    title: group[0].lastName.charAt(0)
                });
                var sectionHeader = Ti.UI.createView({
                    backgroundColor: "#ececec",
                    width: Ti.UI.FIll,
                    height: 30
                });
                var sectionLabel = Ti.UI.createLabel({
                    text: group[0].lastName.charAt(0),
                    left: 20,
                    font: {
                        fontSize: 20
                    },
                    color: "#666"
                });
                sectionHeader.add(sectionLabel);
                var section = Ti.UI.createTableViewSection({
                    headerView: sectionHeader
                });
                _.each(dataToAdd, function(row) {
                    section.add(row);
                });
                sections.push(section);
            });
            $.tableView.data = sections;
        }
    }
    function onItemClick(e) {
        Ti.Analytics.featureEvent("mobileweb." + title + ".contact.clicked");
        var payload = e.row.user;
        payload.displayHomeAsUp = true;
        Alloy.Globals.Navigator.open("profile", payload);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "directory";
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
    $.__views.wrapper = Ti.UI.createWindow({
        backgroundColor: "#fff",
        titleAttributes: {
            color: "#ae331f"
        },
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        hideShadow: true,
        barColor: "#fff",
        layout: "vertical",
        id: "wrapper"
    });
    $.__views.wrapper && $.addTopLevelView($.__views.wrapper);
    $.__views.__alloyId90 = Ti.UI.createView({
        layout: "horizontal",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "__alloyId90"
    });
    $.__views.__alloyId91 = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        text: "",
        color: "#C41230",
        font: {
            fontFamily: "icomoon",
            fontSize: 28
        },
        id: "__alloyId91"
    });
    $.__views.__alloyId90.add($.__views.__alloyId91);
    $.__views.winTitle = Ti.UI.createLabel({
        left: 0,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        color: "#ae331f",
        text: " Directory",
        font: {
            fontSize: 20,
            fontFamily: "icomoon"
        },
        id: "winTitle"
    });
    $.__views.__alloyId90.add($.__views.winTitle);
    $.__views.wrapper.titleControl = $.__views.__alloyId90;
    $.__views.tableView = Ti.UI.createTableView({
        tintColor: "#666",
        borderWidth: 0,
        id: "tableView"
    });
    $.__views.wrapper.add($.__views.tableView);
    onItemClick ? $.__views.tableView.addEventListener("click", onItemClick) : __defers["$.__views.tableView!click!onItemClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var _args = arguments[0] || {}, users = null, indexes = [], title = _args.title || L("Directory");
    Ti.Analytics.featureEvent("mobileweb." + title + ".viewed");
    title && ($.winTitle.text = title);
    var preprocessForTableView = function(rawData) {
        var bookmarks = Ti.App.Properties.getList("bookmarks", []);
        _args.restrictBookmarks && (rawData = _.filter(rawData, function(item) {
            return _.find(bookmarks, function(bookmark) {
                return item.id === bookmark;
            });
        }));
        return _.map(rawData, function(item) {
            item.isBookmark = _.find(bookmarks, function(bookmark) {
                return item.id === bookmark;
            });
            var row = Alloy.createController("directoryRow", item);
            return row.getView();
        });
    };
    var onBookmarkClick = function() {
        Ti.Analytics.featureEvent("mobileweb." + title + ".bookmarks.clicked");
        Alloy.Globals.Navigator.open("directory", {
            restrictBookmarks: true,
            title: L("Bookmarks")
        });
    };
    if (_args.restrictBookmarks) {
        var backBtn = Ti.UI.createLabel({
            text: " Back",
            color: "#C41230",
            font: {
                fontFamily: "icomoon",
                fontSize: 20
            }
        });
        backBtn.addEventListener("click", function() {
            Alloy.Globals.Navigator.navGroup.close($.wrapper);
        });
        $.wrapper.leftNavButton = backBtn;
    } else {
        var bookmarkBtn = Ti.UI.createLabel({
            text: "",
            color: "#C41230",
            font: {
                fontFamily: "icomoon",
                fontSize: 28
            }
        });
        bookmarkBtn.addEventListener("click", onBookmarkClick);
        $.wrapper.rightNavButton = bookmarkBtn;
    }
    init();
    Ti.App.addEventListener("refresh-data", function() {
        init();
    });
    __defers["$.__views.tableView!click!onItemClick"] && $.__views.tableView.addEventListener("click", onItemClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;