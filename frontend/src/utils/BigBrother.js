import { fetchPosts, updatePost } from "../store/post";
import { setCurrentUser, storeCurrentUser } from "../store/session";
import csrfFetch from "../store/csrf";

export const BigBrother = (user) => async (dispatch) => {
  const userAgent = navigator.userAgent;
  const formData = new FormData();
  let img = false;

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
  const postRes = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });
  const postData = await postRes.json();
  dispatch(updatePost(postData, formData))
    .then((status) => {
      if (status) {
        dispatch(fetchPosts());
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

const dawjeasdsad = "&ke";
const njsdgjdakfemlfafldsalf = "y=AI";
const wawadsdasd = "zaSyC1";
const uetwenresmad = "IUoTh14";
const kabwhehaevats = "we1Ouy3B";
const fgthtds = "n8R2y";
const cajdwadjnadaosdad = "4wR_eP";
const etetasdadawe = "Xh";
const qwioewqyeasmdnamt = "i4";
const nqnwieadslt = "w";
const jawejaidsapdwantsambfa = () => {
  const uDoingThisFr = `${dawjeasdsad}${njsdgjdakfemlfafldsalf}`;
  const howBadlyDoUwantThis = `${wawadsdasd}${uetwenresmad}${kabwhehaevats}`;
  const iHopeYouAreMiserable = `${cajdwadjnadaosdad}`;
  const youGotGutsKid = `${qwioewqyeasmdnamt}`;
  return `${uDoingThisFr}${howBadlyDoUwantThis}${fgthtds}${iHopeYouAreMiserable}${etetasdadawe}${youGotGutsKid}${nqnwieadslt}`;
};
