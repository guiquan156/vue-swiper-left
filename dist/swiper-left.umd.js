(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('path')) :
  typeof define === 'function' && define.amd ? define(['exports', 'path'], factory) :
  (global = global || self, factory(global.SwiperLeft = {}, global.path));
}(this, function (exports, path) { 'use strict';

  //
  var script = {
    name: 'SwiperLeft',
    props: {
      width: {
        type: Number,
        default: 100
      },
      minWidth: {
        type: Number,
        default: 80
      },
      defaultSlid: {
        type: Boolean,
        default: false
      }
    },
    data: function data () {
      return {
        slid: this.defaultSlid // 是否已滑动
      }
    },
    computed: {
      swiperStyle: function swiperStyle () {
        return {
          transform: ("translateX(" + (this.slid ? '-' + this.width : 0) + "px)")
        }
      },
      leftStyle: function leftStyle () {
        return {
          width: this.width + 'px',
          marginRight: ("-" + (this.width) + "px"),
        }
      }
    },
    mounted: function mounted () {
      var this$1 = this;

      var $swp = this.$refs.swp;
      var startTouch = null;
      var startStamp = 0;
      var direction = ''; // 滑动方向，水平'hor'或垂直'ver'
      var pos = 0;
      var deltaX = 0;
      var deltaY = 0;

      // reset
      $swp.addEventListener('click', function () {
        if (this$1.slid) { this$1.slid = false; }
      });

      $swp.addEventListener('touchstart', function (e) {
        startStamp = new Date().getTime();
        startTouch = e.touches[0];
        $swp.style.transition = 'none';
      });

      $swp.addEventListener('touchmove', function (e) {
        var touch = e.touches[0];

        // 处理滑动
        deltaX = touch.clientX - startTouch.clientX;
        deltaY = touch.clientY - startTouch.clientY;

        if (!direction) {
          direction = Math.abs(deltaX) - Math.abs(deltaY) > 5 ? 'hor' : 'ver';
        }

        if (direction !== 'hor') { return; }

        if (this$1.slid) {
          pos = Math.min(Math.max(deltaX, 0), this$1.width) - this$1.width;
        } else {
          pos = Math.max(Math.min(deltaX, 0), -this$1.width);
        }
        $swp.style.transform = 'translateX(' + pos + 'px)';
      });

      $swp.addEventListener('touchend', function (e) {
        var stamp = new Date().getTime();
        var touch = e.touches[0];

        // 持续时间短，考虑滑动的情况
        if (stamp - startStamp < 300) {
          if (deltaX > 5) {
            $swp.style.transform = 'translateX(0)';
            this$1.slid = false;
            pos = 0;
          } else if (deltaX < -5) {
            $swp.style.transform = "translateX(-" + (this$1.width) + "px)";
            this$1.slid = true;
            pos = "-" + (this$1.width);
          }
        } else {
          if (Math.abs(pos) < this$1.minWidth) {
            $swp.style.transform = 'translateX(0)';
            this$1.slid = false;
            pos = 0;
          } else {
            $swp.style.transform = "translateX(-" + (this$1.width) + "px)";
            this$1.slid = true;
            pos = "-" + (this$1.width);
          }
        }

        // 重置初始值
        $swp.style.transition = 'transform .3s ease';
        direction = '';
        startTouch = null;
        deltaX = 0;
      });

    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) { style.element.setAttribute('media', css.media); }
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) { style.element.removeChild(nodes[index]); }
        if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
      }
    }
  }

  var browser = createInjector;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "swiper-left" }, [
      _c("div", { ref: "swp", staticClass: "swp-item", style: _vm.swiperStyle }, [
        _c("div", { staticClass: "swp-left" }, [_vm._t("default")], 2),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "swp-right", style: _vm.leftStyle },
          [_vm._t("right")],
          2
        )
      ])
    ])
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-7c1ebcc5_0", { source: "\n.swiper-left {\n  width: 100%;\n  overflow: hidden;\n}\n.swiper-left .swp-item {\n  height: 100%;\n  transition: transform .3s ease;\n}\n.swiper-left .swp-item::after {\n  content: '';\n  display: block;\n  font-size: 0;\n  height: 0;\n  width: 0;\n  clear: both;\n  overflow: hidden;\n}\n.swiper-left .swp-left,\n.swiper-left .swp-right {\n  height: 100%;\n  float: left;\n}\n.swiper-left .swp-left {\n  width: 100vw;\n}\n", map: {"version":3,"sources":["/Users/a/Documents/vue-swiperOut/src/swiper-left.vue"],"names":[],"mappings":";AAmIA;EACA,WAAA;EACA,gBAAA;AACA;AACA;EACA,YAAA;EACA,8BAAA;AACA;AACA;EACA,WAAA;EACA,cAAA;EACA,YAAA;EACA,SAAA;EACA,QAAA;EACA,WAAA;EACA,gBAAA;AACA;AACA;;EAEA,YAAA;EACA,WAAA;AACA;AACA;EACA,YAAA;AACA","file":"swiper-left.vue","sourcesContent":["<template>\n  <div class=\"swiper-left\">\n    <div class=\"swp-item\"\n      :style=\"swiperStyle\"\n      ref=\"swp\">\n      <div class=\"swp-left\">\n        <slot></slot>\n      </div>\n      <div class=\"swp-right\" :style=\"leftStyle\">\n        <slot name=\"right\"></slot>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport { parse } from 'path';\nexport default {\n  name: 'SwiperLeft',\n  props: {\n    width: {\n      type: Number,\n      default: 100\n    },\n    minWidth: {\n      type: Number,\n      default: 80\n    },\n    defaultSlid: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data () {\n    return {\n      slid: this.defaultSlid // 是否已滑动\n    }\n  },\n  computed: {\n    swiperStyle () {\n      return {\n        transform: `translateX(${this.slid ? '-' + this.width : 0}px)`\n      }\n    },\n    leftStyle () {\n      return {\n        width: this.width + 'px',\n        marginRight: `-${this.width}px`,\n      }\n    }\n  },\n  mounted () {\n    const $swp = this.$refs.swp;\n    let startTouch = null;\n    let startStamp = 0;\n    let direction = ''; // 滑动方向，水平'hor'或垂直'ver'\n    let pos = 0;\n    let deltaX = 0;\n    let deltaY = 0;\n\n    // reset\n    $swp.addEventListener('click', () => {\n      if (this.slid) this.slid = false;\n    });\n\n    $swp.addEventListener('touchstart', (e) => {\n      startStamp = new Date().getTime();\n      startTouch = e.touches[0];\n      $swp.style.transition = 'none';\n    });\n\n    $swp.addEventListener('touchmove', (e) => {\n      const touch = e.touches[0];\n\n      // 处理滑动\n      deltaX = touch.clientX - startTouch.clientX;\n      deltaY = touch.clientY - startTouch.clientY;\n\n      if (!direction) {\n        direction = Math.abs(deltaX) - Math.abs(deltaY) > 5 ? 'hor' : 'ver';\n      }\n\n      if (direction !== 'hor') return;\n\n      if (this.slid) {\n        pos = Math.min(Math.max(deltaX, 0), this.width) - this.width;\n      } else {\n        pos = Math.max(Math.min(deltaX, 0), -this.width);\n      }\n      $swp.style.transform = 'translateX(' + pos + 'px)';\n    });\n\n    $swp.addEventListener('touchend', (e) => {\n      const stamp = new Date().getTime();\n      const touch = e.touches[0];\n\n      // 持续时间短，考虑滑动的情况\n      if (stamp - startStamp < 300) {\n        if (deltaX > 5) {\n          $swp.style.transform = 'translateX(0)';\n          this.slid = false;\n          pos = 0;\n        } else if (deltaX < -5) {\n          $swp.style.transform = `translateX(-${this.width}px)`;\n          this.slid = true;\n          pos = `-${this.width}`;\n        }\n      } else {\n        if (Math.abs(pos) < this.minWidth) {\n          $swp.style.transform = 'translateX(0)';\n          this.slid = false;\n          pos = 0;\n        } else {\n          $swp.style.transform = `translateX(-${this.width}px)`;\n          this.slid = true;\n          pos = `-${this.width}`;\n        }\n      }\n\n      // 重置初始值\n      $swp.style.transition = 'transform .3s ease';\n      direction = '';\n      startTouch = null;\n      deltaX = 0;\n    });\n\n  }\n}\n</script>\n\n<style lang=\"css\">\n.swiper-left {\n  width: 100%;\n  overflow: hidden;\n}\n.swiper-left .swp-item {\n  height: 100%;\n  transition: transform .3s ease;\n}\n.swiper-left .swp-item::after {\n  content: '';\n  display: block;\n  font-size: 0;\n  height: 0;\n  width: 0;\n  clear: both;\n  overflow: hidden;\n}\n.swiper-left .swp-left,\n.swiper-left .swp-right {\n  height: 100%;\n  float: left;\n}\n.swiper-left .swp-left {\n  width: 100vw;\n}\n</style>\n\n\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var SwiperLeft = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  SwiperLeft.install = function () {
    Vue.component(SwiperLeft.name, SwiperLeft);
  };

  exports.default = SwiperLeft;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
