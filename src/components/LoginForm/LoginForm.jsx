import axios from 'axios';
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
    setError,
  } = useForm();

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  //   submit function
  const submit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        data
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const accessToken = token.token;
          const refreshToken = token.refreshToken;
          console.log('Access Token:', accessToken);
          console.log('Refresh Token:', refreshToken);
          setAuth({ user, accessToken, refreshToken });
          reset();
          navigate('/');
        }
      }
    } catch (error) {
      setError('apiError', {
        type: 'manual',
        message: 'Login failed',
      });
      console.error('Error during login:', error);
    }
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

        <p className="text-red-500">{errors.apiError?.message}</p>
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
