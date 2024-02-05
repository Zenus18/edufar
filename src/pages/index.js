import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import AuthenticateMiddleware from "@/middleware/authenticate_middleware";
import Url from "@/constant/constant_url";
const inter = Inter({ subsets: ["latin"] });

function Home() {
  const router = useRouter();

  return (
    <div className="hero min-h-screen bg-white text-black">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => router.push(Url.login)}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
    // <div className="bg-white h-screen w-full grid place-items-center">
    //   <h1 className="text-5xl text-gray-700">wait a second....</h1>
    // </div>
  );
}
export default AuthenticateMiddleware(Home);
