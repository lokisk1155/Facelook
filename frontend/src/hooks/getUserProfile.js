import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { profilePage } from "../store/profilePage";

export default function GetUserProfile() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [storeHydrated, setStoreHydrated] = useState(null);

  useEffect(() => {
    dispatch(profilePage(id)).then((storeStatus) => {
      setTimeout(() => {
        setStoreHydrated(storeStatus);
      }, 750);
    });
  }, [dispatch, id]);

  return storeHydrated;
}
