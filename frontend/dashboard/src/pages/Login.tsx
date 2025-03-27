import { createSignal } from "solid-js";
import { useNavigate } from "solid-app-router";
import { login } from "../services/api";

const Login = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const response = await login(email(), password());
    if (response.token) {
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div class="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            onInput={(e) => setEmail(e.currentTarget.value)}
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            onInput={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;