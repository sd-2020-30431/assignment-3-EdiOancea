interface IEncryptionService {
  generateHash: (string) => string;
  compare: (string, string) => boolean;
}

export default IEncryptionService;
