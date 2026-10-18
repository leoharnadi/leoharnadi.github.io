import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist/**', '.generated/**', 'node_modules/**', '.agents/**']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['*.config.ts', 'scripts/**/*.ts', 'tests/**/*.ts', 'tests/**/*.tsx'],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
