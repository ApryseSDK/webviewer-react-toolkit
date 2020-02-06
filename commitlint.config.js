/**
 * This lints commits, and configures the `yarn commit` command.
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow any case for scope (ex: "FileOrganizer").
    'scope-case': [0, 'always', 'lower-case'],

    // Limit possible types.
    'type-enum': [
      2,
      'always',
      [
        '--- Shown in CHANGELOG: ---',
        'build',
        'feat',
        'fix',
        'refactor',
        'style',
        '--- Hidden in CHANGELOG: ---',
        'chore',
        'docs',
        'revert',
        'test',
      ],
    ],
  },
};
