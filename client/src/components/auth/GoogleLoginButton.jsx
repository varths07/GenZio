import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {

  const handleGoogleLogin = () => {
    console.log("Google Login Clicked");

    // TODO:
    // Integrate Firebase or Google OAuth here
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-700 bg-black py-3 text-white transition-all duration-300 hover:border-yellow-400 hover:bg-[#1a1a1a]"
    >
      <FcGoogle size={24} />

      Continue with Google
    </button>
  );
}