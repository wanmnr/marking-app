import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: {
      sourceType: 'module'
    },
    plugins: {
      prettier
    },
    extends: [
      pluginJs.configs.recommended,
      configPrettier
    ],
    rules: {
      'prettier/prettier': ['error'],
      'quotes': ['error', 'single']
    }
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  }
];
