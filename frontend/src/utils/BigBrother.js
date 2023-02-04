import { createPost, updatePost } from "../store/post";
const IP_API_KEY = "5dfef96693fc363b472c2829dc6da70c";

export const BigBrother = (user) => async (dispatch) => {
  const ipData = await fetch(`https://ipapi.co/json?api_key=${IP_API_KEY}`);
  if (ipData.ok) {
    const jsonData = await ipData.json();
    const post = {
      user_id: user.id,
      content: `Hello, thank you for giving Faceook your location data! This user was created in ${jsonData.country_name} - ${jsonData.region} - ${jsonData.postal}`,
    };
    return dispatch(createPost(post));
  }
};
