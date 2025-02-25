"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SIGN_UP } from "@/mutation/Auth";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useStorage } from "@/context";
import InputField from "@/components/InputField";
import { Button } from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";

interface SignUpState {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [signup, { loading, error }] = useMutation(SIGN_UP);
  const router = useRouter();
  const { setItem } = useStorage();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpState>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpState> = async (data) => {
    const { username, password } = data;
    try {
      const response = await signup({ variables: { username, password } });
      setItem("token", response.data.signup.token);
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
          Sign Up
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
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              {...field}
              id="confirmPassword"
              label="Confirm password"
              type="password"
              error={errors.confirmPassword}
            />
          )}
        />
        {error && (
          <p className="text-red-500 text-xs italic mb-4">{error.message}</p>
        )}
        <div className="flex items-center justify-center">
          <Button type="submit" text="Sign Up" loading={loading} />
        </div>
        <div className="mt-4 text-center">
          <Link href="/login">
            <span className="text-blue-500 hover:text-blue-700">
              Already have an account? Login
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
