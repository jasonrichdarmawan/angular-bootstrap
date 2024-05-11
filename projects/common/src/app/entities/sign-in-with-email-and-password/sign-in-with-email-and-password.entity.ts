export type SignInWithEmailAndPasswordResponse =
  | { ok: true }
  | { ok: false; errorCode: SignInWithEmailAndPasswordErrorCode };

export type SignInWithEmailAndPasswordErrorCode =
  | 'email-not-found'
  | 'wrong-password';
