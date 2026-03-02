const Login = ({
  handleLogin,
  handleUserChange,
  handlePassChange,
  username,
  password
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={handleUserChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={handlePassChange}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login