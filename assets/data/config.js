// Configuration for Sentry.io
// Error Tracking

import Raven from 'raven-js';

const sentry_key = 'b204509e3dd94dcda5d04b0b42c93e57';
const sentry_app = '140428';
export const sentryUrl = `https://${sentry_key}@sentry.io/${sentry_app}`;

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}
