# Lerna Monorepo With Typescript

## Setup

```sh
# start a lerna repo
npx lerna init
# configure lerna
echo "add the following to lerna.json"
cat << EOF
{
  "version": "0.0.0",
  "registry": "https://registry.npmjs.org/",
  "publishConfig": {
    "access": "public"
  },
  "npmClient": "yarn",
  "useWorkspaces": true,
  "packages": ["packages/*"],
  "command": {
    "version": {
      "allowBranch": ["master"],
      "message": "chore(release): publish %s",
      "conventional-commits": true,
      "create-release": "github",
      "force-publish": true,
      "sign-git-tag": true,
      "sign-git-commit": true
    }
  }
}
EOF
# make your monorepo a workspace
echo "add the following to your package.json"
cat << EOF
  "workspaces": [
    "packages/*"
  ],
EOF
echo "add the following to your yarnrc"
cat << EOF
# ignore workspace root warning on all commands
--*.ignore-workspace-root-check true
EOF
# install commitizen, husky, and commitlint
yarn add -D commitizen husky @commitlint/{config-conventional,cli}
# initialize commitizen
./node_modules/.bin/commitizen init cz-conventional-changelog --yarn --save-dev --save-exact --force
# install husky
yarn husky install
# prepare commit msg with commitizen
yarn husky add .husky/prepare-commit-msg "exec < /dev/tty && git cz --hook || true"
# check commit messages with commitlint
yarn husky add .husky/commit-msg "yarn commitlint --edit $1"
# Configure commitlint to use conventional config
echo "add the following to your package.json"
cat << EOF
"commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
}
EOF
# make sure husky only runs on dev machines
echo "add the following to your package.json scripts"
cat << EOF
"postinstall": "husky install",
"prepublishOnly": "pinst --disable",
"postpublish": "pinst --enable",
EOF

```
