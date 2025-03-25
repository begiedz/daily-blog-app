const Login = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-4">Login</h2>
      <form className="fieldset w-md max-w-full bg-base-200 border border-base-300 p-8 rounded-box">
        <div>
          <label className="fieldset-label">Username</label>
          <input
            type="text"
            className="input validator w-full"
            placeholder="Admin"
            required
          />
          <div className="validator-hint">Enter valid username</div>
        </div>
        <div>
          <label className="fieldset-label">Password</label>
          <input
            type="password"
            className="input validator w-full"
            placeholder="Password"
            required
          />
          <div className="validator-hint">Enter valid password</div>
        </div>

        <input
          className="btn btn-primary"
          type="submit"
          value="Login"
        />
      </form>
    </>
  )
}

export default Login
