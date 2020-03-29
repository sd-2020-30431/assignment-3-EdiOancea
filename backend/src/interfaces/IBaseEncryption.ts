interface IBaseEncryption {
  generateHash(string): string;
  compare(string, string): boolean;
}

export default IBaseEncryption;
