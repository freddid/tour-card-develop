"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var indexOfListener = function (listeners, listener) {
    var i = listeners.length;
    while (i--) {
        if (listeners[i].listener === listener) {
            return i;
        }
    }
    return -1;
};
/**
 * @deprecated нужно в будущем использовать eventemitter3
 */
var Emitter = /** @class */ (function () {
    function Emitter( /*private eventTypesEnum:{ [index: string]: any } */) {
        // empty
    }
    /*  private getStringFromEnum(eventType: EventTypes){
          return <string>this.eventTypesEnum[<any>eventType];
      }*/
    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} eventType Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted.
     * If the function returns true then it will be removed after calling.
     * @return {Emitter} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.on = function (eventType, listener) {
        return this.addListener(eventType, listener);
    };
    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} eventType Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted.
     * If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.once = function (eventType, listener) {
        return this.addOnceListener(eventType, listener);
    };
    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} eventType Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Emitter} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.off = function (eventType, listener) {
        return this.removeListener(eventType, listener);
    };
    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners,
     * as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} eventType Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.emit = function (eventType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.emitEvent(eventType, args);
    };
    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.removeEvent = function (evt) {
        var type = typeof evt;
        var events = this._getEvents();
        // Remove different things depending on the state of evt
        if (type === 'number') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof Array) {
            // Remove all events matching the regex.
            evt.forEach(function (key) {
                if (events.hasOwnProperty(String(key))) {
                    delete events[key];
                }
            });
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }
        return this;
    };
    Emitter.prototype.getListeners = function (evt) {
        var events = this._getEvents();
        var response;
        var key;
        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }
        return response;
    };
    /**
     * NOT USED??
     */
    // /**
    //  * Takes a list of listener objects and flattens it into a list of listener functions.
    //  *
    //  * @param {Object[]} listeners Raw listener objects.
    //  * @return {Function[]} Just the listener functions.
    //  */
    // private flattenListeners(listeners) {
    //     let flatListeners = [];
    //     let i;
    //
    //     for (i = 0; i < listeners.length; i += 1) {
    //         flatListeners.push(listeners[i].listener);
    //     }
    //
    //     return flatListeners;
    // }
    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object.
     * This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    Emitter.prototype.getListenersAsObject = function (evt) {
        var listeners = this.getListeners(evt);
        var response;
        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }
        return response || listeners;
    };
    Emitter.prototype.addListener = function (evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }
        return this;
    };
    Emitter.prototype.addOnceListener = function (evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };
    /**
     * NOT USED??
     */
    // /**
    //  * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once.
    //  * If you don't do this then how do you expect it to know what event to add to? Should it just add to every
    //  * possible match for a regex? No. That is scary and bad.
    //  * You need to tell it what event names should be matched by a regex.
    //  *
    //  * @param {String} evt Name of the event to create.
    //  * @return {Object} Current instance of EventEmitter for chaining.
    //  */
    // private defineEvent(evt): Emitter<EventTypes> {
    //     this.getListeners(evt);
    //     return this;
    // }
    /**
     * NOT USED??
     */
    // /**
    //  * Uses defineEvent to define multiple events.
    //  *
    //  * @param {String[]} evts An array of event names to define.
    //  * @return {Object} Current instance of EventEmitter for chaining.
    //  */
    // private defineEvents(evts): Emitter<EventTypes> {
    //     for (let i = 0; i < evts.length; i += 1) {
    //         this.defineEvent(evts[i]);
    //     }
    //     return this;
    // }
    Emitter.prototype.removeListener = function (evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);
                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }
        return this;
    };
    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once.
     * The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
     * An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.addListeners = function (evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };
    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once.
     * The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
     * An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.removeListeners = function (evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };
    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job.
     * You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once.
     * The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
     * An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.manipulateListeners = function (remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;
        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }
        return this;
    };
    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    Emitter.prototype.emitEvent = function (evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;
                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[key][i];
                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }
                    response = listener.listener.apply(this, args || []);
                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }
        return this;
    };
    /**
     * NOT USED??
     */
    // /**
    //  * Sets the current value to check against when executing listeners. If a
    //  * listeners return value matches the one set here then it will be removed
    //  * after execution. This value defaults to true.
    //  *
    //  * @param {*} value The new value to check for when executing listeners.
    //  * @return {Object} Current instance of EventEmitter for chaining.
    //  */
    // private setOnceReturnValue(value): Emitter<EventTypes> {
    //     this._onceReturnValue = value;
    //     return this;
    // }
    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    Emitter.prototype._getOnceReturnValue = function () {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };
    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    Emitter.prototype._getEvents = function () {
        return this._events || (this._events = {});
    };
    return Emitter;
}());
exports.Emitter = Emitter;
