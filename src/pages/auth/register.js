import Url from "@/constant/constant_url";
import RegisterForm from "@/components/register_form";
function register() {
  return (
    <div className={`h-screen grid bg-base-200  justify-start`}>
      <div className="md:h-[28rem] md:w-[28rem] h-[22rem] w-[22rem]  bg-white shadow-md rounded-xl shadow-gray-300  p-5 mx-auto  absolute  mt-auto mb-auto top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%]">
        <ul>
          <li className="text-black text-4xl font-bold">Register</li>
          <li className="mt-10 md:h-[20rem] h-[14rem] overflow-y-scroll">
            <RegisterForm />
          </li>
          <li className="justify-end flex mt-10 align-middle gap-2 text-black">
            have account?{" "}
            <a className="text-info cursor-pointer" href={Url.login}>
              login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default register;
