// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // Airbnb-like rules
    'array-bracket-spacing': ['error', 'never'],
    'arrow-body-style': ['error', 'as-needed'],
    'comma-dangle': ['error', 'always-multiline'],
    'eqeqeq': ['error', 'always'],
    'func-style': ['error', 'expression'],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'no-console': 'warn',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],

    // Optional Nuxt/Vue-specific tweaks
    'vue/html-indent': ['error', 2],
    'vue/max-attributes-per-line': ['error', { singleline: 3 }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
  },
});
