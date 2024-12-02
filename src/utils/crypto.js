import CryptoJS from "crypto-js";

// 加密函数
const encryptData = (text, secretKey) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

// 解密函数
const decryptData = (ciphertext, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encryptData, decryptData };
