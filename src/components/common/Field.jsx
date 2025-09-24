export default function Field({ label, children, htmlFor, error }) {
  return (
    <div className="form-control">
      <label className="auth-label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
