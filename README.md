# Lerna Monorepo With Typescript

Based on [how to set up a typescript monorepo with lerna](https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559) and [tsdx-monorepo](https://github.com/jaredpalmer/tsdx-monorepo)

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
# create a common tsconfig for all your packages
echo "add the following to tsconfig.build.json"
cat << EOF
{
  "compilerOptions": {
    "module": "esnext",
    "lib": ["dom", "esnext"],
    "importHelpers": true,
    // output .d.ts declaration files for consumers
    "declaration": true,
    // output .js.map sourcemap files for consumers
    "sourceMap": true,
    // stricter type-checking for stronger correctness. Recommended by TS
    "strict": true,
    // linter checks for common issues
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    // noUnused* overlap with @typescript-eslint/no-unused-vars, can disable if duplicative
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    // use Node's module resolution algorithm, instead of the legacy TS one
    "moduleResolution": "node",
    // transpile JSX to React.createElement
    "jsx": "react",
    // interop between ESM and CJS modules. Recommended by TS
    "esModuleInterop": true,
    // significant perf increase by skipping checking .d.ts files, particularly those in node_modules. Recommended by TS
    "skipLibCheck": true,
    // error out if import and file system have a casing mismatch. Recommended by TS
    "forceConsistentCasingInFileNames": true,
    // `tsdx build` ignores this option, but it is commonly used when type-checking separately with `tsc`
    "noEmit": true
  }
}
EOF
echo "add the following to your tsconfig.json to tell your ide where to look for dependencies"
cat << EOF
{
  // extend common settings
  "extends": "./tsconfig.build.json",
  // include packages and rypes
  "include": ["packages", "types", "example"],
  "compilerOptions": {
    "allowJs": false,
    "baseUrl": ".",
    "typeRoots": ["./node_modules/@types", "./types"],
    // this is the magic sauce, add every project to your paths field
    // so the compiler knows where to look for them
    "paths": {
      "@slate-extensions/core": ["packages/core/src"],
      "@slate-extensions/common": ["packages/common/src"]
    }
  }
}
EOF
echo "add the following to each of your projects as a local tsconfig.build.json"
cat << EOF
{
  // extend common settings
  "extends": "../../tsconfig.build.json",
  // include local files
  "include": ["src", "types", "../../types"]
}
EOF

```
