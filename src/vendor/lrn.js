const LRN = {};

export function register(dependencies) {
    for (let key in dependencies) {
        if (dependencies.hasOwnProperty(key)) {
            LRN[key] = dependencies[key];
        }
    }
}

export default LRN;