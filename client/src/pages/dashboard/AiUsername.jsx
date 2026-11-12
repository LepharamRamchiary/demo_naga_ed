import { useState } from "react";
import { Sparkles } from "lucide-react";
import aiApi from "../../api/ai";

function getErrorMessage(error) {
  const data = error.response?.data;
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.detail === "string") return data.detail;
  if (Array.isArray(data?.detail)) {
    return data.detail.map((item) => item.msg).filter(Boolean).join(" ");
  }
  return error.message || "Unable to generate suggestions. Please try again.";
}

export default function AiUsername() {
  const [interests, setInterests] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [notice, setNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const interestList = interests
      .split(/[,\n]/)
      .map((interest) => interest.trim())
      .filter(Boolean);

    setNotice(null);
    setSuggestions([]);

    if (interestList.length < 1 || interestList.length > 10) {
      setNotice({
        type: "error",
        message: "Enter between 1 and 10 interests, separated by commas.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await aiApi.post("/api/suggest-username", {
        interests: interestList,
      });
      setSuggestions(data.suggestions);
      setNotice({
        type: "success",
        message: data.message || "Your username suggestions are ready.",
      });
    } catch (error) {
      setNotice({ type: "error", message: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chili/10 text-chili">
          <Sparkles size={24} aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink">
            AI Username Generator
          </h1>
          <p className="mt-1 text-sm text-smoke">
            Share a few interests and get three personalized username ideas.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <label htmlFor="interests" className="text-sm font-semibold text-ink">
          Your interests
        </label>
        <p className="mt-1 text-sm text-smoke">
          Enter up to 10 interests, separated by commas.
        </p>
        <textarea
          id="interests"
          value={interests}
          onChange={(event) => setInterests(event.target.value)}
          placeholder="Gaming, anime, cooking"
          rows={3}
          maxLength={300}
          required
          className="mt-3 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-ink outline-none transition focus:border-chili focus:ring-2 focus:ring-chili/15"
        />

        {notice && (
          <p
            role={notice.type === "error" ? "alert" : "status"}
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              notice.type === "error"
                ? "border border-red-200 bg-red-50 text-red-700"
                : "border border-green-200 bg-green-50 text-green-800"
            }`}
          >
            {notice.message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-chili px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Sparkles size={18} aria-hidden="true" />
          {submitting ? "Generating..." : "Generate usernames"}
        </button>
      </form>

      {suggestions.length > 0 && (
        <section className="mt-8" aria-labelledby="suggestions-heading">
          <h2
            id="suggestions-heading"
            className="text-lg font-display font-bold text-ink"
          >
            Your suggestions
          </h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {suggestions.map((suggestion, index) => (
              <li
                key={`${suggestion}-${index}`}
                className="rounded-2xl border border-slate-200 bg-paper/50 p-5 text-center text-lg font-semibold text-ink"
              >
                {suggestion}
              </li>
            ))}
          </ol>
        </section>
      )}
    </section>
  );
}
