import mitt from 'mitt';

const emitter = mitt();

// Backward-compat wrapper: EventBus.$on / $emit / $off
export const EventBus = {
    $on:  (event, handler) => emitter.on(event, handler),
    $off: (event, handler) => emitter.off(event, handler),
    $emit: (event, ...args) => emitter.emit(event, ...args),
};

export default emitter;
