module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:mdx/recommended',
    'plugin:jest/recommended',
  ],
  plugins: [
    'jest',
    'prettier',
    'mdx',
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['*.test.tsx', '*.stories.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['*.stories.mdx'],
      rules: {
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': 1,
    'no-debugger': 1,
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    semi: [2, 'never'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-shadow': 'error',
  },
  settings: {
    jest: {
      version: 27,
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.mdx'],
      },
    },
  },
}
