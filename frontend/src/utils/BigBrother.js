import { updatePost } from "../store/post";
import { setCurrentUser, storeCurrentUser } from "../store/session";
import csrfFetch from "../store/csrf";
const IP_API_KEY = "5dfef96693fc363b472c2829dc6da70c";
const userAgent = navigator.userAgent;

export const BigBrother = (user) => async (dispatch) => {
  const formData = new FormData();
  let canvas = false;
  let newPost = false;
  const ipData = await fetch(`https://ipapi.co/json?api_key=${IP_API_KEY}`);
  if (ipData.ok) {
    const jsonData = await ipData.json();
    // canvas = ProcessGoogleMapsBasedOffIP(jsonData);
    const post = {
      user_id: user.id,
      content: `Hello, thank you for giving Faceook your data! This user was created in ${jsonData.country_name} - ${jsonData.region} - ${jsonData.postal} using a ${userAgent}`,
    };
    let postRes = await csrfFetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });
    // const postData = await postRes.json();
    // newPost = postData[Object.keys(postData)[Object.keys(postData).length - 1]];
    // formData.append("postAttached[photo]", canvas);
    // if (newPost && canvas) {
    //   dispatch(updatePost(newPost, formData));
    // }
    storeCurrentUser(user);
    dispatch(setCurrentUser(user));
  }
};

const ProcessGoogleMapsBasedOffIP = async (data) => {
  debugger;
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");
  const location = `${data.region}, ${data.country_name} ${data.postal}`;
  const image = new Image();
  image.src = `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=14&size=500x500&key=""`;
  image.onload = function () {
    ctx.drawImage(image, 0, 0);
  };
  return canvas;
};
