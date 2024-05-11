export type IsEmailExistsResponse =
  | { ok: true }
  | { ok: false; errorCode: IsEmailExistsErrorCode };

export type IsEmailExistsErrorCode = 'email-not-found';
