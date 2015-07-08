function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.button/" + s : s.substring(0, index) + "/nl.fokkezb.button/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function applyProperties(_properties) {
        var _view, _apply = {};
        _properties.spacing && (_properties.title || _properties.titleid) && ("right" !== _properties.iconPosition ? _apply.right = _properties.spacing : _apply.left = _properties.spacing);
        "undefined" != typeof _properties.iconSize && (iconSize = _properties.iconSize);
        if ("image" === type || _properties.icon && -1 !== _properties.icon.indexOf(".")) {
            if (iconSize) if (_.isArray(iconSize)) {
                _apply.width = iconSize[0];
                _apply.height = iconSize[1];
            } else if (_.isObject(iconSize)) {
                iconSize.width && (_apply.width = iconSize.width);
                iconSize.height && (_apply.height = iconSize.height);
            } else _apply.width = _apply.height = iconSize;
            if (_properties.icon) {
                icon = _properties.icon;
                if (view && "image" === type) _apply.image = icon; else {
                    _view = Ti.UI.createImageView(_.extend({
                        width: Ti.UI.SIZE,
                        height: Ti.UI.SIZE,
                        image: icon,
                        touchEnabled: false
                    }, _apply));
                    _apply = {};
                    view && $.iconWrap.remove(view);
                    $.iconWrap.add(_view);
                    view = _view;
                    type = "image";
                    IconicFont = null;
                }
            }
        } else if ("font" === type || _properties.icon && -1 === _properties.icon.indexOf(".")) {
            (!IconicFont || _properties.iconFont && _properties.iconFont !== iconFont) && _properties.iconFont && (iconFont = _properties.iconFont);
            _apply.font = _properties.font ? _.clone(_properties.font) : $.iconWrap.font || {};
            iconSize && (_apply.font.fontSize = iconSize);
            _apply.font.fontFamily = iconFont;
            _.extend(_apply, _.pick(_properties, "color", "shadowOffset", "shadowColor"));
            if (_properties.icon) {
                icon = _properties.icon;
                _apply.text = icon;
                if (!view || "font" !== type) {
                    _view = Ti.UI.createLabel(_.extend({
                        touchEnabled: false,
                        textAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_BOTTOM
                    }, _apply));
                    _apply = {};
                    view && $.iconWrap.remove(view);
                    $.iconWrap.add(_view);
                    view = _view;
                    type = "font";
                }
            }
        }
        _.isEmpty(_apply) || view.applyProperties(_apply);
        return;
    }
    function setIcon(icon, iconFont) {
        return applyProperties({
            icon: icon,
            iconFont: iconFont
        });
    }
    function getIcon() {
        return {
            icon: icon,
            iconFont: iconFont
        };
    }
    new (require("alloy/widget"))("nl.fokkezb.button");
    this.__widgetId = "nl.fokkezb.button";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "icon";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.iconWrap = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        touchEnabled: false,
        id: "iconWrap"
    });
    $.__views.iconWrap && $.addTopLevelView($.__views.iconWrap);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var IconicFont, view, iconSize, type = "font", icon = "icon-sign-blank", iconFont = "FontAwesome";
    Object.defineProperty($, "icon", {
        get: getIcon,
        set: setIcon
    });
    arguments[0] && applyProperties(arguments[0]);
    exports.applyProperties = applyProperties;
    exports.getIcon = getIcon;
    exports.setIcon = setIcon;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;