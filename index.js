'use strict';

const { validateEnv, EnvValidationError } = require('@yash_bura123/env-validator');

const schema = {
  APP_NAME: { type: 'string', default: 'Classroom Demo' },
  PORT: { type: 'number', default: 3000, min: 1, max: 65535, format: 'port' },
  ENABLE_CACHE: { type: 'boolean', default: false },
  NODE_ENV: {
    type: 'string',
    default: 'development',
    enum: ['development', 'test', 'production']
  },
  environments: {
    production: {
      APP_NAME: { type: 'string', required: true, minLength: 3 },
      PORT: { type: 'number', required: true, min: 1024, max: 65535, format: 'port' }
    }
  }
};

const mode = process.argv[2] || 'success';
if (!['success', 'failure'].includes(mode)) {
  console.error('Choose a demo mode: npm run demo:success or npm run demo:failure');
  process.exitCode = 1;
} else {
  // Supply an environment-like object so either example works on any computer.
  const demoEnv = mode === 'success'
    ? { NODE_ENV: 'production', APP_NAME: 'Teacher Demo', PORT: '8080', ENABLE_CACHE: 'true' }
    : { NODE_ENV: 'production', APP_NAME: 'X', PORT: 'not-a-port', ENABLE_CACHE: 'sometimes' };

  try {
    const config = validateEnv(schema, { env: demoEnv, silent: true });
    console.log('Configuration validated. The app can start with:');
    console.log(JSON.stringify(config, null, 2));
  } catch (error) {
    if (!(error instanceof EnvValidationError)) throw error;
    console.error('Configuration is invalid. Startup is stopped:');
    console.error(error.message);
    process.exitCode = 1;
  }
}
