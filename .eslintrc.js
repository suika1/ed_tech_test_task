module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'eslint:recommended',
    'airbnb',
    'plugin:flowtype/recommended',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  'rules': {
    'linebreak-style': 0,
    'implicit-arrow-linebreak': 'off',
    // problems with linter in vscode
    'import/no-unresolved': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        'aspects': [
          'invalidHref',
        ],
      },
    ],

    'import/extensions': 'off',

    'react/no-danger': 'off',
    'react/no-unused-state': 'off',
    'react/no-array-index-key': 'off',
    'react/sort-comp': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/label-has-for': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-filename-extension': 'off',
    'import/prefer-default-export': 'off',

    'react/no-typos': 'off',

    'object-curly-newline': 'off',

    // off
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'no-restricted-globals': 'off',
    'radix': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'semi': 'off',
    'yoda': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'function-paren-newline': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'no-underscore-dangle': 'off',
    'array-callback-return': 'off',
    'react/prefer-stateless-function': 'off',
    'camelcase': 'off',
    'no-param-reassign': 'off',
    'react/no-did-update-set-state': 'off',
    'import/no-mutable-exports': 'off',

    // warn
    'import/no-cycle': 'warn',
    'max-len': 'warn',
    'no-shadow': 'warn',
    'no-unused-vars': 'warn',
    'padded-blocks': 'warn',
    'quote-props': 'warn',
    'react/no-unused-prop-types': 'warn',
  },
}
