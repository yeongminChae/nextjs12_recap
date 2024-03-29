import { FieldError, FieldErrors, useForm } from "react-hook-form";

interface IForm {
  username: string;
  email: string;
  password: string;
  errors: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // watch는 하나의 필드, 그리고 여러 필드를 모두 감시할 수 있음
    setError, // setError는 필드에 대한 에러를 수동으로 설정할 수 있음
    setValue, // setValue는 필드의 값을 수동으로 설정할 수 있음
  } = useForm<IForm>({
    mode: "onBlur",
    // mode: "onChange",
  });
  const onValid = (data: IForm) => {
    setError("username", { message: "taken username" });
  };
  const onInValid = (errors: FieldErrors) => {};
  // setValue("username", "test");
  return (
    <form onSubmit={handleSubmit(onValid, onInValid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "Username should be longer than 5 chars.",
            value: 5,
          },
        })}
        type="text"
        placeholder="username"
      />
      <input
        {...register("email", {
          required: "email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "gmail is not allowed",
          },
        })}
        type="email"
        placeholder="email"
        className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "password is required",
        })}
        type="password"
        placeholder="password"
      />
      <input type="submit" value="create account" />
    </form>
  );
}
