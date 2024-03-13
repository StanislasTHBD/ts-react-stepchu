import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "../../services/AuthService";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authResponse = await signInWithEmailAndPassword(email, password);
    if (authResponse) {
      localStorage.setItem("token", authResponse.token);
      localStorage.setItem("user", JSON.stringify(authResponse.user));
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-screen-md flex">
        <div className="w-1/2 flex justify-center items-center pr-8">
          <div className="flex flex-col items-center">
            <img
              src="/logo_stepchu.svg"
              alt="Logo"
              className="mb-4 w-48 h-48"
            />
            <p className="text-center text-3xl">StepCHU</p>
          </div>
        </div>
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Se connecter</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                required
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-custom-blue text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
            >
              Se connecter
            </button>
          </form>
          {/* <p className="mt-4 text-center text-gray-500">
            Besoin de vous connecter ?{" "}
            <Link to="/signup" className="text-blue-500">
              Créer un compte
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
