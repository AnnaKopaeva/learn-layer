"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LOGIN } from "@/mutation/Auth";
import { useStorage } from "@/context";
import { schema } from "./validation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/InputField";
import { Button } from "@/components/Button";

interface LogInState {
  username: string;
  password: string;
}

export default function Login() {
  const { setItem } = useStorage();

  const [login, { loading, error }] = useMutation(LOGIN);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInState>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LogInState> = async (data) => {
    const { username, password } = data;
    try {
      const response = await login({ variables: { username, password } });
      setItem("token", response.data.login.token);
      await router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              {...field}
              id="username"
              label="Username"
              type="text"
              error={errors.username}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              {...field}
              id="password"
              label="Password"
              type="password"
              error={errors.password}
            />
          )}
        />
        {error && (
          <p className="text-red-500 text-xs italic mb-4">{error.message}</p>
        )}
        <div className="flex items-center justify-center">
          <Button type="submit" text="Log in" loading={loading} />
        </div>
        <div className="mt-4 text-center">
          <Link href="/signup">
            <span className="text-blue-500 hover:text-blue-700">
              Don&apos;t have an account? Sign Up
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
