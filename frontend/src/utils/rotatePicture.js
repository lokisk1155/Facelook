function NoPainNoGain(ky) {
  const rvrsd = ky.split("").reverse().join("");
  const fh = rvrsd.substring(0, rvrsd.length / 2);
  const sh = rvrsd.substring(rvrsd.length / 2);
  const swpd = sh + fh;
  const wRC = "ABC" + swpd + "XYZ";
  const asciiCds = wRC.split("").map((ch) => ch.charCodeAt(0));
  const hexStr = asciiCds.map((cd) => cd.toString(16)).join("");
  const rvrsdHex = hexStr.split("").reverse().join("");
  const oKy = rvrsdHex
    .substring(3, rvrsdHex.length - 3)
    .match(/.{2}/g)
    .map((hex) => String.fromCharCode(parseInt(hex, 16)))
    .join("");
  return oKy;
}

export default NoPainNoGain;
