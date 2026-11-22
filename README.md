# Environment validation classroom demo

A small Node.js project showing how [`@yash_bura123/env-validator`](https://www.npmjs.com/package/%40yash_bura123%2Fenv-validator) checks and converts configuration before an application starts.

## Requirements

- Node.js 18 or newer
- npm

## Run it

```sh
npm install
npm run demo:success
```

The success example validates a production configuration and prints the normalized values. For example, the string `"8080"` becomes the number `8080`, and `"true"` becomes the boolean `true`.

```sh
npm run demo:failure
```

The failure example supplies an invalid port and boolean. The validator reports the configuration problems together, throws `EnvValidationError`, and the demo marks startup as failed. That command is expected to exit with status 1.

## What to point out

- **Schema:** `index.js` declares each setting's type, defaults, allowed values, and limits.
- **Conversion:** values read as strings are converted to numbers and booleans.
- **Environment rules:** production has stricter rules than the base schema.
- **Safe failure:** invalid settings prevent startup and are reported in one error.
- **Repeatability:** the demo passes a sample `env` object to `validateEnv`, so it does not rely on secrets or machine-specific settings.

The demo uses the package's CommonJS entry point and the documented `env` and `silent` options.

## Try your own values

Edit the `demoEnv` object in `index.js`, then run `npm start` (or `npm run demo:success`). Try changing `PORT` to `"70000"`, removing it in production, or setting `ENABLE_CACHE` to `"maybe"` and observe the validation report.

## Package

- npm: [@yash_bura123/env-validator](https://www.npmjs.com/package/%40yash_bura123%2Fenv-validator)
- Source: [env-validator](https://github.com/yash-boora/env-validator)
