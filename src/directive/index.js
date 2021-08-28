import Vue from "vue";

Vue.directive("autoHide", {
  update(el, binding, vnode) {
    let key = Object.keys(binding.value)[0];
    let that = vnode.context;
    if (!el.__clickOutside__) {
      el.__clickOutside__ = function(e) {
        if (!el.contains(e.target)) {
          that[key] = false;
          document.removeEventListener("click", el.__clickOutside__);
        }
      };
    }
    document.removeEventListener("click", el.__clickOutside__);
    if (that[key] >= 0) {
      setTimeout(() => {
        document.addEventListener("click", el.__clickOutside__);
      }, 0);
    }
  },
  unbind(el) {
    document.removeEventListener("click", el.__clickOutside__);
    delete el.__clickOutside__;
  },
});

Vue.directive("loading", {
  update: function(el, value) {
    if (value.value) {
      const canPush = el.getElementsByClassName("customLoading");
      if (canPush.length != 0) {
        return;
      }

      const position =
        window.getComputedStyle(el, null).getPropertyValue("position") ||
        el.style.position;
      if (position !== "absolute") {
        el.classList.add("loading-father-p");
      }

      el.classList.add("loading-father-o");

      const para = document.createElement("div");
      const html = `
      <svg class="icon refleash" aria-hidden="true">
          <use xlink:href="#icon-Loading"></use>
        </svg>
      `;
      para.innerHTML = html;
      para.setAttribute("class", "duotu-loading");
      el.appendChild(para);
    } else {
      for (var i = 0; i < el.childNodes.length; i++) {
        if (el.childNodes[i].className === "duotu-loading") {
          let childNodes = document.getElementsByClassName("duotu-loading")[0];
          el.removeChild(childNodes);

          el.classList.remove("loading-father-p");
          el.classList.remove("loading-father-o");

          if (!document.getElementsByClassName("duotu-loading")[0]) return;
          document.getElementsByClassName("duotu-loading")[0].remove();

          break;
        }
      }
    }
  },
});
