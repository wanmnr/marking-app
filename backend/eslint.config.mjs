import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: {
      sourceType: 'module',
    },
    plugins: {
      prettier,
    },
    extends: [pluginJs.configs.recommended, configPrettier],
    rules: {
      // Separate import groups with newline by section
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'unknown',
          ],
          'newlines-between': 'always',
        },
      ],
      'no-useless-return': 1,
      'newline-before-return': 1,
      'prettier/prettier': ['error'],
      'quotes': ['error', 'single'],
      'react/prop-types': 1,
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
];
