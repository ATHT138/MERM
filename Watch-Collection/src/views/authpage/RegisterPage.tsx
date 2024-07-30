import { Link } from "react-router-dom";
import assert from "../../asserts";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-700">
      <div className="absolute flex flex-col justify-center flex-1 w-3/12 px-6 py-12 shadow-2xl lg:px-8 bg-slate-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <img
            className="w-auto h-10 mx-auto"
            src={assert.image.mark}
            alt="Your Company"
          />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm />
          <p className="mt-10 text-sm text-center text-gray-500">
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
