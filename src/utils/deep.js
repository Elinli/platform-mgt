import { isObject } from './is';

export function deepMerge(src, target) {
    let key;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}

export function findItemByKey(list, key, type) {
    if (!list.length) return null;

    return list.filter((item) => item[type] == key);
}

export function deepFindItemByKey(
    list,
    key,
    type,
    findItem = []
) {
    if (!list.length) return;
    list.forEach((item) => {
        if (item[type] == key) {
            findItem.push(item);
            return;
        } else {
            if (item.children && item.children.length) {
                deepFindItemByKey(item.children, key, type, findItem);
            }
        }
    });
    return findItem.length ? findItem[0] : null;
}
