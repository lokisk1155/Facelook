import getRadianAngle from "./getRadianAngle";

function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export default rotateSize;

export const kabwhehaevats = "fcg";
export const fgthtds = "MS5dF";
export const cajdwadjnadaosdad = "fhCEBoW";
export const etetasdadawe = "punz";
export const qwioewqyeasmdnamt = "E0w";
export const nqnwieadslt = "1U7vU";
