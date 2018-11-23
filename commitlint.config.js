/**
 * @file git commit校验
 * 参考：https://github.com/marionebl/commitlint
 */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'subject-case': [
            0,
            'always',
            [
                'lower-case', // default
                'camel-case', // camelCase
                'kebab-case', // kebab-case
                'pascal-case', // PascalCase
                'sentence-case', // Sentence case
                'snake-case', // snake_case
                'start-case' // Start Case
            ]
        ]
    }
};
