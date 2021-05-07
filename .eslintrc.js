module.exports = {
    parser: 'vue-eslint-parser', // 解析 .vue 文件
    extends: [
        'plugin:vue/recommended', // 这里也可以启用其他规则，如默认的 vue/essential
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        parser: '@typescript-eslint/parser' // 解析 .ts 文件
    },
    env: {
        browser: true,
        es6: true,
    },
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/explicit-module-boundary-types": ["off"],
        "@typescript-eslint/no-this-alias": [
            "error",
            {
                "allowDestructuring": true, // Allow `const { props, state } = this`; false by default
                "allowedNames": ["self","that"] // Allow `const self = this`; `[]` by default
            }
    ]
    }
}