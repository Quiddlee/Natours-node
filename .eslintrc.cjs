module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.cjs', 'prettier.config.js', 'node_modules'],
  plugins: ['import', 'prettier', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'sort-imports': ['error', {ignoreCase: true, ignoreDeclarationSort: true}],
    'import/extensions': ["error", "never"],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        pathGroups: [
          {
            pattern: 'node',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  settings: {
    'import/resolver': 'node',
  },
};
