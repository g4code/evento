;(function() {

    function Evento() {};

    Evento.prototype = {

        /**
         * Registered events map
         */
        events: {},

        /**
         * Resets all event listeners
         */
        clear: function()
        {
            this.events = {};
        },

        /**
         * Returns all registered events
         */
        getEvents: function()
        {
            return this.events;
        },

        /**
         * Check if event is registered
         */
        hasEvent: function(name)
        {
            return this.events[name] !== undefined;
        },

        /**
         * Unbind event listener
         *
         * @param {String} name - event name
         */
        off: function(name)
        {
            delete this.events[name];
        },

        /**
         * Bind event listener
         *
         * @param {String} name - event name
         * @param {Function} callback - registered function
         */
        on: function(name, callback)
        {
            this.events[name] = callback;
        },

        /**
         * Triggers registered event.
         * If event is not registered do nothing.
         *
         * @param {String} name - event name
         * @param {mixed} args - custom messages passed to subscriber
         */
        trigger: function(name, args)
        {
            if (this.hasEvent(name)) {

                this.events[name](args);
            }
        }
    };

    /**
     * Singleton instance
     */
    Evento.instance = null;

    /**
     * Singleton initiation
     */
    Evento.getInstance = function() {

        if (this.instance === null) {
            this.instance = new Evento();
        }
        return this.instance;
    };

    if ((typeof module != 'undefined') && (module.exports)) { // Node Module

        module.exports = Evento.getInstance();

    } else if (typeof define != 'undefined' && define.hasOwnProperty('amd') && define.amd) { // RequireJS AMD

        define(Evento.getInstance());

    } else if (typeof window != 'undefined') { // Fall back to attaching to window

        window.Evento = Evento.getInstance();
    };
}.call(this));