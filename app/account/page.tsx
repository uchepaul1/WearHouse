"use client";
import { useAuth } from "../../components/AuthContext";
import { useState } from "react";

export default function AccountPage() {
  // FIXED: Removed 'error' from destructuring since it doesn't exist in AuthContext
  const { authenticated, user, login, signup, logout, loading } = useAuth();
  const [signupMode, setSignupMode] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // FIXED: Added local error state to handle authentication errors
  const [error, setError] = useState<string | null>(null);

  if (loading) return <div className="mt-16 text-center">Loading...</div>;

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 border rounded shadow bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">{signupMode ? "Sign Up" : "Login"}</h2>
        <form
          onSubmit={async e => {
            e.preventDefault();
            setError(null); // Clear previous errors
            try {
              if (signupMode) {
                await signup(username, password);
              } else {
                await login(username, password);
              }
            } catch (err) {
              // FIXED: Handle authentication errors locally
              setError(err instanceof Error ? err.message : "Authentication failed");
            }
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Username"
            className="w-full border px-3 py-2 rounded"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-semibold"
          >
            {signupMode ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          {signupMode ? (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-700 underline"
                onClick={() => {
                  setSignupMode(false);
                  setError(null); // Clear errors when switching modes
                }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button
                className="text-blue-700 underline"
                onClick={() => {
                  setSignupMode(true);
                  setError(null); // Clear errors when switching modes
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded shadow bg-white text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h2>
      <p className="mb-6 text-neutral-600">You are logged in.</p>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
      >
        Logout
      </button>
    </div>
  );
}