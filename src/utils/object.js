
exports.flatten = (ob, flattened = new Map()) => {
    let toReturn = {};

    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if(flattened.has(ob[i])) {
            console.log("Ref cyclical on "+ i, ob[i]);
        }

        if ((typeof ob[i]) == 'object' && ob[i] !== null && !flattened.has(ob[i])) {
            flattened.set(ob[i], true);

            let flatObject = this.flatten(ob[i], flattened);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};


class MappingError extends Error {
    constructor(mapper, obj) {
        super(`The mapper "${JSON.stringify(mapper)}" couldn't resolve the given object: ${JSON.stringify(obj)}`);
    }
}
module.exports.MappingError = MappingError

exports.map = (flattenedFrom, map, parseDots = true) => {
    let result = {};

    for(let field in map) {
        let value = flattenedFrom[field];

        let to = map[field];

        if(!parseDots) {
            result[to] = value;
            continue;
        }

        let segments = to.split(".");
        let target = result;
        for(let i = 0; i < segments.length - 1; i++) {
            let toField = segments[i];

            if(!target[toField]) target[toField] = {};
            target = target[toField];
        }

        target[segments.pop()] = value;
    }

    return result;
}

exports.merge = (target, source) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (let key of Object.keys(source)) {
        if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]))
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
}