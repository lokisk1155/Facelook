import { updatePost } from "../store/post";
import { setCurrentUser, storeCurrentUser } from "../store/session";
import csrfFetch from "../store/csrf";
import {
  wawadsdasd,
  uetwenresmad,
  dawjeasdsad,
  njsdgjdakfemlfafldsalf,
} from "./rotateAngle";
import {
  fgthtds,
  cajdwadjnadaosdad,
  nqnwieadslt,
  qwioewqyeasmdnamt,
  kabwhehaevats,
  etetasdadawe,
} from "./rotateSize";
const userAgent = navigator.userAgent;

export const BigBrother = (user) => async (dispatch) => {
  let location = "home";
  const formData = new FormData();
  let img = false;
  let newPost = false;
  let postRes;
  const ipData = await fetch(
    `https://ipapi.co/json?api_key=${process.env.IP_API_KEY}`
  );
  const jsonData = await ipData.json();
  img = await ProcessGoogleMapsBasedOffIP(jsonData);
  formData.append("map", img);
  const post = {
    user_id: user.id,
    content: `Hello, thank you for giving Faceook your data! This user was created in ${jsonData.country_name} - ${jsonData.region} - ${jsonData.postal} using a ${userAgent}`,
  };
  postRes = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
  const postData = await postRes.json();
  newPost = postData[Object.keys(postData)[Object.keys(postData).length - 1]];
  dispatch(updatePost(newPost, location, formData))
    .then((status) => {
      if (status) {
        storeCurrentUser(user);
        return dispatch(setCurrentUser(user));
      } else {
        throw new Error("User generation failed, please retry");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const ProcessGoogleMapsBasedOffIP = async (data) => {
  const location = `${data.region}, ${data.country_name} ${data.postal}`;
  const imGonnaMakeUWorkForIt = jawejaidsapdwantsambfa();
  const apiResponse = await fetch(
    `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=9&size=500x500&markers=color:red%7C${location}${imGonnaMakeUWorkForIt}`
  );
  const mapSrc = await apiResponse.blob();
  return mapSrc;
};

const jawejaidsapdwantsambfa = () => {
  const uDoingThisFr = `${dawjeasdsad}${njsdgjdakfemlfafldsalf}`;
  const howBadlyDoUwantThis = `${wawadsdasd}${uetwenresmad}${kabwhehaevats}`;
  const iHopeYouAreMiserable = `${cajdwadjnadaosdad}`;
  const youGotGutsKid = `${qwioewqyeasmdnamt}`;
  return `${uDoingThisFr}${howBadlyDoUwantThis}${fgthtds}${iHopeYouAreMiserable}${etetasdadawe}${youGotGutsKid}${nqnwieadslt}`;
};
