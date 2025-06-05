"use client";

import React, { useState } from "react";
import news from "public/news.png";

export default function NewsLetterSection() {
  const [frequency, setFrequency] = useState<"weekly" | "monthly">("weekly");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setTimeout(() => {
      setEmail("");
      setLoading(false);
      setSuccess(true);
    }, 1500);
  }

  return (
    <section className="bg-neutral-100 w-full flex justify-center mb-0 pb-0 border-t border-neutral-200">
      <div className="w-[92vw] max-w-[1500px] px-0">
        <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-2xl overflow-hidden shadow-xl w-full border border-neutral-200 bg-white">
          <div
            className="relative flex-1 min-w-0 p-8 md:p-12 bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${news.src})` }}
            aria-label="Newsletter background image"
          >
            <div className="absolute inset-0 bg-black/45"></div>
            <div className="relative z-10 text-white w-full max-w-lg mx-auto">
              <p className="bg-blue-100 px-3 py-1 text-base rounded-md w-fit text-blue-800 mb-4 font-medium shadow">
                Our newsletters
              </p>
              <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight drop-shadow">
                Subscribe for <span className="text-blue-300">insider updates</span>
              </h3>
              <p className="mb-5 text-blue-100/90 font-medium text-base">
                Tips, exclusive offers, and the latest news. No spam, ever.
              </p>
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col gap-3"
                aria-label="Newsletter subscription form"
              >
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    aria-label="Email address"
                    className="w-full p-4 pr-36 text-base rounded-lg text-gray-800 focus:ring-2 ring-blue-400 border border-gray-200 shadow"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    aria-label="Subscribe"
                    className="absolute top-2 right-2 px-6 py-2 text-base font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 focus-visible:ring-2 ring-blue-400 disabled:bg-blue-300 text-white shadow transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Subscribing...
                      </span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
                <div className="flex justify-start gap-6 text-base mt-1 mb-1">
                  <label htmlFor="weekly" className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="frequency"
                      value="weekly"
                      checked={frequency === "weekly"}
                      onChange={(e) =>
                        setFrequency(e.target.value as typeof frequency)
                      }
                      id="weekly"
                      className="accent-blue-500 scale-110"
                    />
                    Weekly
                  </label>
                  <label htmlFor="monthly" className="flex items-center gap-2 cursor-pointer font-medium">
                    <input
                      type="radio"
                      name="frequency"
                      value="monthly"
                      checked={frequency === "monthly"}
                      onChange={(e) =>
                        setFrequency(e.target.value as typeof frequency)
                      }
                      id="monthly"
                      className="accent-blue-500 scale-110"
                    />
                    Monthly
                  </label>
                </div>
                {success && (
                  <div
                    className="flex items-center gap-2 bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg mt-1 text-sm shadow-sm"
                    aria-live="polite"
                  >
                    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    Subscribed! Check your inbox for updates.
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="flex-1 min-w-0 bg-gradient-to-tr from-blue-50 via-gray-100 to-blue-100 flex items-center justify-center p-8 md:p-12">
            <div className="w-full max-w-md text-center mx-auto">
              <div className="flex justify-center mb-4">
                <span className="inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-600 p-4 shadow-lg">
                  <svg width={32} height={32} fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path d="M4 4h16v16H4z" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3">
                Join Our Community
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-4">
                Stay ahead of the curve! <br className="hidden md:inline" />
                Subscribe now for exclusive updates, trends, and special offers delivered straight to your inbox.
              </p>
              <ul className="flex flex-col items-center gap-2 text-gray-700 text-sm mt-4">
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                  Unsubscribe any time
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                  No spam, privacy respected
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
                  Hand-picked content
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}