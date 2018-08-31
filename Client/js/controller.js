class VSEvent {
  constructor() {
    this.channel = {};
    this.eventNumber = 0;
  }

  trigger(event, data) {
    for (let topic in this.channel) {
      if (this.channel.hasOwnProperty(topic)) {
        if (topic.split("-")[0] == event) {
          this.channel[topic](data) !== false || delete this.channel[topic];
        }
      }
    }
  }

  on(event, callback) {
    this.channel[event + --this.eventNumber] = callback;
  }

  off(topic) {
    delete this.channel[topic];
  }
  
  set setChannel(channel) {
    this.channel = channel;
  }

  set setEventNumber(eventNumber) {
    this.eventNumber = eventNumber;
  }
}

class VSModel extends VSEvent {
  constructor(attributes={}) {
    super();
    this.id = VSFun.uuid();
    this.attribute = attributes;   
  }

  getModel(attribute) {
    return this.attribute[attribute];
  }

  setModel(attributes) {
    if (!VSFun.errorObject(attributes)) {
      VSFun.fillObject(this.attribute, attributes);
      this.change(attributes);
    }
    return this;
  }

  get toJSON() {
    return JSON.stringify(this.attributes);
  };

  change(attributes) {
    this.trigger(this.id + ':update', attributes);
  }; 
}

class VSView extends VSEvent {
  constructor() {
    super();
    let args = Array.from(arguments)[0];

    for (let o in args) {
      this[o] = args[o];
    }

    this.id = VSFun.uuid();
  }

  observe(model) {
    this.on(model.id + ':update', function (data) {
      document.querySelector(this.el).innerHTML = this.template(model.toJSON());
    }.bind(this));
  }  
}

class VSController {
  constructor() {
    let args = Array.from(arguments)[0];

    for (let o in args) {
      this[o] = args[o];
    }

    this.id = VSFun.uuid();
  }

  initialize() {
    this.view.observe(this.model);
    return this;
  }

  increment() {
    this.model.setModel(this.model.attribute);
    return this;
  }

  alerter() {
    alert("Yo!");
  }

  // var parts, selector, eventType;
  // if (this.events) {
  //   _.each(this.events, function (method, eventName) {
  //     parts = eventName.split('.');
  //     selector = parts[0];
  //     eventType = parts[1];
  //     $(selector)['on' + eventType] = this[method];
  //   }.bind(this));
  // }  

}