module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['react', '@emotion', 'jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['tsx', 'ts', 'jsx', 'js']
      }
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'space-before-function-paren': 'off'
  },
  settings: {
    react: {
      version: 'latest'
    }
  }
}
