function is_same_object(obj1, obj2, tags) {
    for (let i = 0; i < tags.length; i++) {
        if (obj1[tags[i]] !== obj2[tags[i]]) {
            return false;
        }
    }
    return true;
}

export function containsObject(obj, list, tags) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (is_same_object(list[i], obj, tags)) {
            return true;
        }
    }

    return false;
}