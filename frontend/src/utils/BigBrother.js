import { createPost } from "../store/post";
const IP_API_KEY = process.env.IP_API_KEY;

export const BigBrother = (user) => async (dispatch) => {
  const ipData = await fetch(`https://ipapi.co/json?api_key=${IP_API_KEY}`);
  if (ipData.ok) {
    const jsonData = await ipData.json();
    const post = {
      user_id: user.id,
      content: `Hello, thank you for giving me your data. This user was created in ${jsonData.region} - ${jsonData.postal}`,
    };
    return dispatch(createPost(post));
  }
};
