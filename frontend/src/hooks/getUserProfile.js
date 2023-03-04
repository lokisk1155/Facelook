import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { profilePage } from "../store/profilePage";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function GetUserProfile() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [storeHydrated, setStoreHydrated] = useState(null);

  useEffect(() => {
    dispatch(profilePage(id)).then((data) => {
      setTimeout(() => {
        setStoreHydrated(data);
      }, 750);
    });
  }, [dispatch, id]);

  return storeHydrated;
}
