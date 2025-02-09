import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'postcss.config.cjs',
      'eslint.config.mjs',
      '.lintstagedrc.cjs',
      '.prettierrc.cjs',
      '**/node_modules',
      'build',
      'coverage',
      '**/*.d.ts',
      '**/package-lock.json',
    ],
  },
  {
    plugins: {
      import: importPlugin,
      react: react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/display-name': 'off',
      'react/prop-types': 'off',
    },
  },
];
