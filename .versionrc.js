/**
 * This formats the auto-generated Changelog, and GitHub releases.
 */
module.exports = {
  types: [
    /* --- Shown in Changelog. --- */

    // Affects the build system or external dependencies.
    { type: 'build', section: 'Build and Dependencies' },
    // Adds a new feature.
    { type: 'feat', section: 'Features' },
    // Solves a bug.
    { type: 'fix', section: 'Bug Fixes' },
    // Rewrites code without feature, performance or bug changes.
    { type: 'refactor', section: 'Refactors' },
    // Improves formatting, white-space.
    { type: 'style', section: 'Styles' },

    /* --- Hidden from Changelog. --- */

    // Other changes that don't modify src or test files.
    { type: 'chore', hidden: true },
    // Adds or alters documentation.
    { type: 'docs', hidden: true },
    // Reverts a previous commit.
    { type: 'revert', hidden: true },
    // Adds or modifies tests.
    { type: 'test', hidden: true },
  ],
};
