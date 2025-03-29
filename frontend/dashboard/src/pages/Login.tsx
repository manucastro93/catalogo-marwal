import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { login } from "../services/api";

const Login = () => {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    try {
      const response = await login(username(), password());
      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard", { replace: true });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4" style={{ width: "20rem" }}>
        <h2 class="card-title text-center mb-4">Login</h2>
        {error() && <div class="alert alert-danger" role="alert">{error()}</div>}
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input 
              type="text" 
              class="form-control" 
              id="username" 
              value={username()} 
              onInput={(e) => setUsername(e.currentTarget.value)} 
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input 
              type="password" 
              class="form-control" 
              id="password" 
              value={password()} 
              onInput={(e) => setPassword(e.currentTarget.value)} 
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;