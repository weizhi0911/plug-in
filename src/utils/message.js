import Vue from 'vue';
import Message from '@bizCmp/Message.vue';

const messageBox = Vue.extend(Message);

Message.install = function(options, type) {
  if (options === undefined || options === null) {
    options = {
      content: ''
    };
  } else if (typeof options === 'string' || typeof options === 'number') {
    options = {
      content: options
    };
    if (type != undefined && options != null) {
      options.type = type;
    }
  }

  let instance = new messageBox({
    data: options
  }).$mount();
  const message = document.getElementById('my-message');
  message && message.remove();
  const isBig =
    window
      .getComputedStyle(document.getElementById('duotu-big'), null)
      .getPropertyValue('display') === 'block';
  const mask = document.getElementsByClassName('g-mask-duotu')[0];
  const xcaptcha = document.getElementsByClassName('xcaptcha')[0];

  if (!isBig && !mask && !xcaptcha) {
    document.getElementById('duotu-plug-in').appendChild(instance.$el);
    instance.$el.classList.add('duotu-plug-message');
  } else {
    document.body.appendChild(instance.$el);
  }
  Vue.nextTick(() => {
    instance.visible = true;
  });
};

export default Message.install;
