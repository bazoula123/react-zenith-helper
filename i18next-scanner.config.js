module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',
    // Use ! to exclude files
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/i18n/**',
    '!**/node_modules/**',
  ],
  output: './src/locales',
  options: {
    debug: true,
    removeUnusedKeys: true,
    sort: true,
    func: {
      list: ['t', 'i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    trans: {
      component: 'Trans',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    lngs: ['fr'],
    ns: ['translation'],
    defaultLng: 'fr',
    defaultNs: 'translation',
    defaultValue: '',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: '{{lng}}/{{ns}}.json',
    },
    nsSeparator: ':',
    keySeparator: '.',
  },
};