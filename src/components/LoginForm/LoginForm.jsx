import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Field from '../common/Field';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  //   submit function
  const submit = (data) => {
    console.log(data);
    const user = { ...data };
    setAuth({ user });
    reset();
    navigate('/');
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      >
        {/* <!-- email --> */}
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <input
            {...register('email', {
              required: 'email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
            })}
            className={`auth-input ${errors.email ? 'border-red-500' : ''}`}
            name="email"
            type="email"
            id="email"
          />
        </Field>
        {/* <!-- password --> */}
        <Field
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <input
            {...register('password', {
              required: 'password is required',
              minLength: {
                value: 8,
                message: 'your password must be at least 8 characters long',
              },
            })}
            className={`auth-input ${errors.password ? 'border-red-500' : ''}`}
            name="password"
            type="password"
            id="password"
          />
        </Field>
        {/* <!-- Submit --> */}
        <Field>
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Login
          </button>
        </Field>
      </form>
    </>
  );
}
