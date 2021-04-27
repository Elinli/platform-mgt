const toString = Object.prototype.toString;

export function is(val, type) {
    return toString.call(val) === `[object ${type}]`;
}

export const isObject = (val) => {
    return val !== null && is(val, 'Object');
};
export const isFunction = (arg) => {
    return typeof arg === 'function';
};
export function isString(val) {
    return is(val, 'String');
}
