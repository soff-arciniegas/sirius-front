import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLogin } from "@/modules/core/hooks/useApiHooks";
import { LoginRequest, LoginResponse } from "@/modules/core/interfaces/Api.interface";

export function useLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { mutate, isError, isSuccess } = useGetLogin();
  const navigate = useNavigate();


  const handleSubmit = () => {
    if (username && password) {
      setIsLoading(true);
      const loginData: LoginRequest = { username, password };
      mutate(loginData);
    } else {
      setError("Por favor, llena todos los campos");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    } else if (isError) {
        setIsLoading(false);
        setError("Usuario o contraseña incorrectos. Intentalo de nuevo");
    }
  }, [isSuccess, isError,  navigate]);

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
    isLoading,
    isError,
    isSuccess,
    error,
  };
}
