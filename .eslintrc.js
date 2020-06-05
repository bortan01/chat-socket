module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "io": "readonly",
        "$": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {}
};