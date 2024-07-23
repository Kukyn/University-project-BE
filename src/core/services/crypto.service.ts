import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';

export class CryptoService {
  static saltRounds: number = 10;
  static cryptoFolder: string = path.join(__dirname, '..', '..', '..', 'crypto');
  static JWTKeyNames = ['jwt-private-key.pem', 'jwt-public-key.pem'];

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  static async comparePasswords(password: string, entityPassword: string): Promise<boolean> {
    return bcrypt.compare(password, entityPassword);
  }

  static getJWTPublicKey = () =>
    fs.readFileSync(path.join(CryptoService.cryptoFolder, 'jwt', CryptoService.JWTKeyNames[1]));

  static getJWTPrivateKey = () =>
    fs.readFileSync(path.join(CryptoService.cryptoFolder, 'jwt', CryptoService.JWTKeyNames[0]));
}
