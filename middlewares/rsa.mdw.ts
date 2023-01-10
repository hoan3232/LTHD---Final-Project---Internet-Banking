import NodeRSA from "node-rsa";

export function resDecrypt(text, key) {
  let privateKey = new NodeRSA(key);
  let decrypt = privateKey.decrypt(text, "utf8");
  return decrypt;
}

export function resKey() {
  const keys = new NodeRSA({ b: 1024 });
  const publicKey = keys.exportKey("public");
  const privateKey = keys.exportKey("public");
  return {
    publicKey: publicKey,
    privateKey: privateKey,
  };
}

export default {
  resDecrypt,
  resKey,
};
