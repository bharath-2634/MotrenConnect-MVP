import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleLogin } from "@/store/auth-slice";
import "../styles/style.css";


const GoogleLoginButton = () => {
  const dispatch = useDispatch();

  return (
    <GoogleOAuthProvider clientId="997407954891-15midcdg8c555ds9hrbd3emjbtam5pv5.apps.googleusercontent.com">
     <div className="google-btn-container w-full text-white">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("googleBtn",credentialResponse.credential);
            dispatch(googleLogin(credentialResponse.credential)).then((data)=>{
              if(data?.payload?.success) {
                console.log("Successs login")
              }else {
                console.log("failed login")
              }
            });
          }}
          onError={() => {
            console.log("Google Login Failed");
          }}
          theme="outline"
        />
     </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
