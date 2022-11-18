/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  const pass= bcrypt.hashSync(rawPassword, SALT);
  return pass;
}

export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
