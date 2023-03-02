import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { profilePage } from "../store/profilePage";
import { useParams } from "react-router-dom";

export default function GetUserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    dispatch(profilePage(id)).then((data) => {
      setLoading(data);
    });
  }, [dispatch, id]);

  return loading;
}
