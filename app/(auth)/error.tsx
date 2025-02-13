"use client";

import { FC } from "react";
import { Error } from "@/types/Error";

interface ErrorProps {
  error: Error;
}

const ErrorWrapper: FC<ErrorProps> = ({ error }) => {
  return <div>{error.message}</div>;
};

export default ErrorWrapper;
