# Lerna Monorepo With Typescript

Based on [how to set up a typescript monorepo with lerna](https://medium.com/@NiGhTTraX/how-to-set-up-a-typescript-monorepo-with-lerna-c6acda7d4559) and [tsdx-monorepo](https://github.com/jaredpalmer/tsdx-monorepo)

## Quick Start

`yarn install && yarn start`

## Features

- go to definition works out of the box everywhere
- `yarn start` starts storybook and an example with hot reloading enabled for all packages
- `yarn test` runs tests in every package
- `yarn lint` runs linting in every package

## Make it your own

Replace `@slate/extensions` everywhere with your own scope.
Delete `CHANGELOG.md`.
Change the versions of all the packages to `0.0.0` (TODO show how to do this with `lerna version`)

## Common Tasks

### Adding a new package

```sh
# go to the packages directory
cd packages;
# create your package without the name (don't use storybook)
npx tsdx create utils
# remove the old husky hook from package.json and the prettier config
cat << EOF
  "husky": {
    "hooks": {
      "pre-commit": "tsdx lint"
    }
  },
  "prettier": {
    "printWidth": 80,
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5"
  },
EOF
# change the name in package.json to "@slate-extensions/utils"
cat << EOF
"name": "@slate-extensions/utils"
EOF

# create a new tsconfig.build.json and remove the default tsconfig.json
cat << EOF
{
  "extends": "../../tsconfig.build.json",
  "include": ["src", "types", "../../types"]
}
EOF

# make the scripts point to the new tsconfig.build.json
cat << EOF
    "start": "tsdx watch --tsconfig tsconfig.build.json --verbose --noClean",
    "build": "tsdx build --tsconfig tsconfig.build.json",
    "test": "tsdx test --passWithNoTests",
    "lint": "tsdx lint",
    "prepare": "yarn build",
    "size": "size-limit",
    "analyze": "size-limit --why"
EOF

# remove the example folder if one exists


```

### Expressing a Dependency Between Packages

Make `@slate-extensions/common` a dependency of `@slate-extensions/core`

```sh
lerna add "@slate-extensions/common" --scope="@slate-extensions/core"  [--dev] [--exact] [--peer]
```

### Running Tests in Watch mode

```sh
lerna run test --stream --parallel -- --watch
```

### Incrementing the version of all packages (they are kept in sync)

TODO document `GH_TOKEN` required by [`--create-release`](https://github.com/lerna/lerna/blob/main/commands/version/README.md#--create-release-type)

```sh
yarn run version
```

### Publishing

TODO write this

### Upgrading all packages

```
npm install -g npm-check-updates
lerna exec -- "ncu -u"
yarn install
```

## How this Repo Was Setup?

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
      "message": "chore(release): publish %s"
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
# lint before commit
yarn husky add .husky/pre-commit "tsdx lint"
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

In the `example` package we have a vite app created using `yarn create @vitejs/app` and selecting the `react+typescript` options.
The only change is using a custom `tsconfig.build.json` file.

In the `storybook` package we have a storybook.
Storybook requires a local `tsconfig.json` so we have one there.
The storybook example was ripped out of a tsdx template but the storybook files are moved into the `src` directory and the package.json is greatly simplified.

Both `example` and `storybook` have `private: true` in their `package.json` so they are not accidentally published.
