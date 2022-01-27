import { getSession } from 'next-auth/react';

/**
 * Middleware for ensuring the user who is trying to access the route has the correct permissions
 * @param {array[string]} roles The string representation of the roles allowed in the route.
 * @returns a middleware function to authorize or reject the user.
 */
function withPermissions(roles) {
  return async function (req, res, next) {
    const userSession = await getSession({ req });

    if (!userSession) {
      return res.status(401).end('Unauthorized! User must be an admin to access this route');
    }

    // add the session to req so we don't need to make the getSession call again down stream
    req.session = userSession;
    next();
  };
}

export default withPermissions;
