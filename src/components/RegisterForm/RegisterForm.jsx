export default function RegisterForm() {
  return (
    <>
      <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]">
        {/* <!-- name --> */}
        <div className="form-control">
          <label className="auth-label" for="name">
            Name
          </label>
          <input className="auth-input" name="name" type="text" id="name" />
        </div>
        {/* <!-- email --> */}
        <div className="form-control">
          <label className="auth-label" for="email">
            Email
          </label>
          <input className="auth-input" name="email" type="email" id="email" />
        </div>
        {/* <!-- password --> */}
        <div className="form-control">
          <label className="auth-label" for="email">
            Password
          </label>
          <input
            className="auth-input"
            name="password"
            type="password"
            id="password"
          />
        </div>
        {/* <!-- confirm password --> */}
        <div className="form-control">
          <label className="auth-label" for="confirmPassword">
            Retype Password
          </label>
          <input
            className="auth-input"
            name="confirmPassword"
            type="password"
            id="confirmPassword"
          />
        </div>
        {/* <!-- Submit --> */}
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
}
