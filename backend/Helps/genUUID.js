import Crypto from 'crypto';

export default function geneUUID() {
    const bytes = Crypto.randomBytes(16); // 16 byte = 128 bit
    const hex = bytes.toString("hex");
    return (
        hex.substr(0, 8) + "-" +
        hex.substr(8, 4) + "-" +
        hex.substr(12, 4) + "-" +
        hex.substr(16, 4) + "-" +
        hex.substr(20)
    );
}