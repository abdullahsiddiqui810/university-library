"use client";
import {
  useForm,
  Path,
  DefaultValues,
  SubmitHandler,
  UseFormReturn,
  FieldValues,
  Controller,
  ValidateFormEventType,
  FieldPath,
  FormValidateResult,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldControl,
} from "@/components/ui/field";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {FormState} from "@base-ui/react";
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}


const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();

  const isSignIn = type === "SIGN_IN";

  // @ts-ignore
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result?.success) {
      toast.add({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",

      });

      router.push("/");
      // router.refresh();
    } else {
      toast.add({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occurred.",
        variant: "destructive",
      });
    }
  };
  // @ts-ignore
  // @ts-ignore
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "welcome back to BookWise" : "Create Your Library Account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "  Please complete all fields and upload a valid university ID to gain\n" +
            "        access to the library"}
      </p>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 w-full"
      >
        {Object.keys(defaultValues).map((field) => (
          <Controller
            key={field}
            name={field as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="capitalize">
                  {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                </FieldLabel>
                <FieldGroup>
                  {field.name === "universityCard" ? (
                    <ImageUpload onFileChange={field.onChange} />
                  ) : (
                    <Input
                      required
                      type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                      {...field}
                      className="form-input"
                    />
                  )}
                </FieldGroup>
              </Field>
            )}
          />
        ))}

        <Button type="submit" className="form-btn">
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "welcome back to BookWise" : "Create Your Library Account"}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary hover:underline"
        >
          {isSignIn ? " Create an account" : " Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
