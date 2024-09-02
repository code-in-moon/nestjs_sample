export const env = {
  isProduction: process.env.APP_ENV === 'prod',
  isLambda:
    !!process.env.AWS_EXECUTION_ENV &&
    process.env.AWS_EXECUTION_ENV.indexOf('AWS_Lambda_') !== -1,
  isStaging: process.env.APP_ENV === 'staging',
  isNext: process.env.APP_ENV === 'next',
  isTest: process.env.APP_ENV === 'test',
  isDevelopment: process.env.APP_ENV === 'dev',
  isBuild: process.env.APP_ENV === 'build',
  isLocal: process.env.APP_ENV === 'local',
  currentEnv: process.env.APP_ENV || 'local',
};
