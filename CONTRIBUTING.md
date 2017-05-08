# Code Style
This repo lints using eslint and formats code using Prettier[https://github.com/prettier/prettier]. Make sure that both are integrated with your IDE.

Example Prettier VSCode configuration:
```
"prettier.semi": false,
"prettier.trailingComma": "es5",
"prettier.singleQuote": true,
"prettier.bracketSpacing": true,
"prettier.printWidth": 90,
"prettier.useTabs": false,
"prettier.jsxBracketSameLine": false,
```

# Naming
## Commits
 - Commit subject should be no longer than 72 characters
 - Subject should have the format `<component/area name>: <subject>`
   - i.e. `Walkthrough: Add WalkthroughStep component`
 - Subject should start w/ an imperative verb
   - i.e. 'Add', 'Implement', 'Refactor', 'Integrate' etc.

## Branches
Feature branches should follow the following structure: `<user name>/<type>/<title>`
- Valid types are `fix` `chore` `feature`

i.e. `zerim/fix/missing-walkthrough-props`

## Pull Requests
PR names should be prefixed with "Fix:", "Feature:" or "Chore:"
