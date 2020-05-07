module.exports = {
    "parser": '@typescript-eslint/parser',
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2019,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "settings": {
        "react": {
            "version": "lastest"
        }
    },
    "overrides": [
        {
            "files": ["**/*.tsx"],
            "rules": {
                "react/prop-types": "off"
            }
        }
    ],
    "rules": {
        "prettier/prettier": "error"
    }
};