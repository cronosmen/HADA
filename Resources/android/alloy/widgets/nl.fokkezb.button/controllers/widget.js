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
    function setStyle(style) {
        if (!Styles.has(style)) return false;
        return applyProperties(Styles.get(style));
    }
    function getStyle() {
        return _properties.style;
    }
    function applyProperties(properties) {
        properties = properties || {};
        _.extend(_properties, properties);
        _properties.style && Styles.has(_properties.style) && _.defaults(_properties, Styles.get(_properties.style));
        if (false === properties.enabled) {
            $.outer.touchEnabled = false;
            if (_properties.disabledStyle) {
                _properties.enabledStyle = _.pick(_properties, _.keys(_properties.disabledStyle));
                _.extend(_properties, _properties.disabledStyle);
            }
        } else {
            if (true === properties.enabled) {
                $.outer.touchEnabled = true;
                if (_properties.enabledStyle) {
                    _.extend(_properties, _properties.enabledStyle);
                    delete _properties.enabledStyle;
                }
            }
            _properties.activeStyle && (_properties.defaultStyle = _.pick(_properties, _.keys(_properties.activeStyle)));
        }
        if (_initted) {
            _icon && _icon.applyProperties(_properties);
            _title && _title.applyProperties(_properties);
        } else {
            _initted = true;
            _properties.icon && (_icon = Widget.createController("icon", _properties));
            _icon && "right" !== _properties.iconPosition && $.inner.add(_icon.getView());
            if (void 0 !== _properties.title || void 0 !== _properties.titleid) {
                _title = Widget.createController("title", _properties);
                $.inner.add(_title.getView());
            }
            _icon && "right" === _properties.iconPosition && $.inner.add(_icon.getView());
        }
        _applyOuterProperties(_properties);
        _applyInnerProperties(_properties);
    }
    function setTitle(title) {
        if (!_initted || !_title) return false;
        _title.applyProperties({
            title: title
        });
        return true;
    }
    function getTitle() {
        if (!_initted || !_title) return;
        return _title.getTitle();
    }
    function setTitleid(titleid) {
        if (!_initted || !_title) return false;
        _title.applyProperties({
            titleid: titleid
        });
        return true;
    }
    function getTitleid() {
        if (!_initted || !_title) return;
        return _title.getTitleid();
    }
    function setIcon(icon, iconFont) {
        if (!_initted || !_icon) return false;
        _icon.setIcon(icon, iconFont);
        return true;
    }
    function getIcon() {
        if (!_initted || !_icon) return;
        return _icon.getIcon();
    }
    function hide() {
        $.outer.hide();
        return;
    }
    function show() {
        delete _properties.visible;
        $.outer.show();
        return;
    }
    function _applyOuterProperties(properties) {
        var apply = _.pick(properties, "width", "height", "top", "right", "bottom", "left", "center", "backgroundColor", "backgroundGradient", "backgroundImage", "backgroundLeftCap", "backgroundTopCap", "backgroundRepeat", "borderColor", "borderWidth", "borderRadius", "opacity", "visible", "bubbleParent");
        _.size(apply) && $.outer.applyProperties(apply);
    }
    function _applyInnerProperties(properties) {
        var apply = {};
        if (properties.padding) if ("object" == typeof properties.padding) if (_.isArray(properties.padding)) {
            var ln = properties.padding.length;
            if (1 === ln) {
                apply.top = properties.padding[0];
                apply.right = apply.right;
                apply.bottom = apply.bottom;
                apply.left = apply.left;
            } else if (2 === ln) {
                apply.top = properties.padding[0];
                apply.right = properties.padding[1];
                apply.bottom = apply.top;
                apply.left = apply.right;
            } else if (3 === ln) {
                apply.top = properties.padding[0];
                apply.right = properties.padding[1];
                apply.bottom = properties.padding[2];
                apply.left = apply.right;
            } else {
                apply.top = properties.padding[0];
                apply.right = properties.padding[1];
                apply.bottom = properties.padding[2];
                apply.left = properties.padding[3];
            }
        } else _.extend(apply, _.pick(properties.padding, "top", "right", "bottom", "left")); else {
            apply.top = properties.padding;
            apply.right = properties.padding;
            apply.bottom = properties.padding;
            apply.left = properties.padding;
        }
        _.size(apply) && $.inner.applyProperties(apply);
    }
    function _onTouchstart() {
        if (_properties.activeStyle) {
            _title && _title.applyProperties(_properties.activeStyle);
            _icon && _icon.applyProperties(_properties.activeStyle);
            _applyOuterProperties(_properties.activeStyle);
            _applyInnerProperties(_properties.activeStyle);
        }
        _properties.sound && _properties.sound.play();
    }
    function _onTouchend(e) {
        if (_properties.defaultStyle) {
            _title && _title.applyProperties(_properties.defaultStyle);
            _icon && _icon.applyProperties(_properties.defaultStyle);
            _applyOuterProperties(_properties.defaultStyle);
            _applyInnerProperties(_properties.defaultStyle);
        }
        "touchend" === e.type && $.trigger("click", {
            type: "click",
            source: $
        });
    }
    var Widget = new (require("alloy/widget"))("nl.fokkezb.button");
    this.__widgetId = "nl.fokkezb.button";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.outer = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "outer"
    });
    $.__views.outer && $.addTopLevelView($.__views.outer);
    _onTouchstart ? $.__views.outer.addEventListener("touchstart", _onTouchstart) : __defers["$.__views.outer!touchstart!_onTouchstart"] = true;
    _onTouchend ? $.__views.outer.addEventListener("touchcancel", _onTouchend) : __defers["$.__views.outer!touchcancel!_onTouchend"] = true;
    _onTouchend ? $.__views.outer.addEventListener("touchend", _onTouchend) : __defers["$.__views.outer!touchend!_onTouchend"] = true;
    $.__views.inner = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "inner"
    });
    $.__views.outer.add($.__views.inner);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Styles = require(WPATH("styles"));
    var _icon, _title, _initted = false, _properties = {};
    if (arguments[0]) {
        var args = arguments[0];
        if (args.id) {
            exports.id = args.id;
            delete args.id;
        }
        delete args.__parentSymbol;
        delete args.__itemTemplate;
        delete args["$model"];
        void 0 === args.style && (args.style = Styles.getDefault());
        applyProperties(arguments[0]);
    }
    exports.applyProperties = applyProperties;
    exports.setStyle = setStyle;
    exports.getStyle = getStyle;
    Object.defineProperty($, "style", {
        get: getStyle,
        set: setStyle
    });
    exports.hide = hide;
    exports.show = show;
    exports.setTitle = setTitle;
    exports.getTitle = getTitle;
    Object.defineProperty($, "title", {
        get: getTitle,
        set: setTitle
    });
    exports.setTitleid = setTitleid;
    exports.getTitleid = getTitleid;
    Object.defineProperty($, "titleid", {
        get: getTitleid,
        set: setTitleid
    });
    exports.setIcon = setIcon;
    exports.getIcon = getIcon;
    Object.defineProperty($, "icon", {
        get: getIcon,
        set: setIcon
    });
    exports.addEventListener = $.on;
    exports.removeEventListener = $.off;
    exports.fireEvent = $.trigger;
    __defers["$.__views.outer!touchstart!_onTouchstart"] && $.__views.outer.addEventListener("touchstart", _onTouchstart);
    __defers["$.__views.outer!touchcancel!_onTouchend"] && $.__views.outer.addEventListener("touchcancel", _onTouchend);
    __defers["$.__views.outer!touchend!_onTouchend"] && $.__views.outer.addEventListener("touchend", _onTouchend);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;