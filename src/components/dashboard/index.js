import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import SectionHeader from "./SectionHeader";
import "../../assets/css/admin.css";
import { getUser } from "../../services/api"; ////api to get current user

///parsing jwt token
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

///index
export default function Index() {
  const [user, setUser] = useState({}); ////user state
  ///useEffect to get current user
  useEffect(async () => {
    const token = Cookies.get("AUTH-TOKEN");
    if (token) {
      var user = parseJwt(token);
      let res = await getUser(user.id);
      setUser(res?.data?.data);
    }
  }, []);

  // returning jsx
  return (
    <>
      <SectionHeader user={user} />
      <Dashboard user={user} setUser={setUser} />
    </>
  );
}
