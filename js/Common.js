; (function (window, undefined) {

    var ensure = function (obj, name, factory) {
        return obj[name] || (obj[name] = factory());
    };
    /*
    *   创建Storage对象
    *   typespace { string } 缓存类型
    */
    var createStorage = function (typespace) {
        var StorageInstance = {
            type: (!!typespace ? typespace : "session") + "Storage", //local本地存储，session会话存储
            /*
            *   保存缓存，页面回话打开期间有效
            *   @key {String} 键
            *   @val {String} 值
            */
            set: function (key, val) {
                if (Object.prototype.toString.call(val) != "[object String]") throw "缓存保存值必须是字符串！";
                //各浏览器支持的 localStorage 和 sessionStorage 容量上限不同。
                //如果达到上限则删除第一个键重新保存
                try {
                    window[this.type].setItem(key, val);
                } catch (e) {
                    this.shift();
                    this.set(key, val);
                }
            },
            /*
            *   获取键的值
            *   @key { string } 键名称
            */
            get: function (key) {
                return window[this.type].getItem(key);
            },
            /*
            *   获取第n个键的值
            *   index { int } 位置
            */
            key: function(index){
                return window[this.type].key(index);
            },
            /*
            *   删除指定key值
            *   @key {String} 键名称
            */
            del: function (key) {
                window[this.type].removeItem(key);
            },
            //返回StorageStorage对象
            getStorage: function () {
                return window[this.type];
            },
            //删除当前第一个StorageStorage对象的键
            shift: function () {
                this.del(window[this.type].key(0));
            }
        };

        return StorageInstance;
    }

    ensure(window, "Store", function () {
        /*
        *   local本地存储，session会话存储
        *   typespace {String} local,session
        */
        var outStore = function (typespace) {            
            return createStorage(typespace);
        }
        return outStore;
    });

})(window);

;(function(){
    //工具箱
    var tool = {
        /*
         *  合并两个对象，浅拷贝
         *  @param {Object} obj1
         *  @param {Object} obj2
         */
        extend: function(obj1, obj2) {
            if (!obj2 && this._typeof(obj2) != "object") return;

            for (var key in obj2) {
                if (obj2.hasOwnProperty(key)) {
                    obj1[key] = obj2[key];
                }
            }

            return obj1;
        },
        /*
         *   获取目标数据类型
         *   @param {Object} obj
         */
        _typeof: function(obj) {
            if (obj == null) {
                return String(obj);
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[class2type.toString.call(obj)] || "object" :
                typeof obj;
        },
        /*
         *   为dom元素添加指定事件
         *   @element {Object} Dom对象
         *   @type {String} 事件名称
         *   @handler {Function} 事件处理函数
         */
        addHandler: function(element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        /*
         *   为dom元素删除指定事件
         *   @element {Object} Dom对象
         *   @type {String} 事件名称
         *   @handler {Function} 事件处理函数
         */
        removerHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        }
    };

    //数据类型
    var class2type = {};
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e, i) {
        class2type["[object " + e + "]"] = e.toLowerCase();
    });
    
    window.tool = tool;
})();