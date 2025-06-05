"use client";
import { useAuth } from "./AuthContext";
import { useState } from "react";

export function AccountModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const fn = mode === "login" ? login : signup;
    const res = await fn(username, password);
    if (res.error) setError(res.error);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button 
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Username"
            className="border w-full px-3 py-2 rounded"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            className="border w-full px-3 py-2 rounded"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600" role="alert">{error}</div>}
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 text-center">
          {mode === "login" ? (
            <>Don&apos;t have an account? <button onClick={() => setMode("signup")} className="text-blue-600 underline hover:text-blue-800">Sign Up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("login")} className="text-blue-600 underline hover:text-blue-800">Login</button></>
          )}
        </div>
      </div>
    </div>
  );
}