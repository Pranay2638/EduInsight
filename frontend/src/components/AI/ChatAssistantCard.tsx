"use client";

import { useState } from "react";

import Card from "@/components/ui/Card";

import {
  MessageSquare,
  Send,
  Loader2,
  Brain,
  Lightbulb,
  Target,
} from "lucide-react";

import {
  chatWithAI,
  ChatResponse,
} from "@/services/chatService";

const suggestions = [
  "Which subject should I study tomorrow?",
  "Why is my DBMS score low?",
  "Am I studying enough this week?",
  "How can I improve in DSA?",
];

export default function ChatAssistantCard() {
  const [question, setQuestion] = useState("");

  const [response, setResponse] = useState<ChatResponse | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setError("");

      const result = await chatWithAI(question);

      setResponse(result);
    } catch (err) {
      console.error(err);

      setError("Unable to get an AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center gap-3">
        <MessageSquare className="text-emerald-600" />

        <h2 className="text-xl font-semibold">Ask EduInsight</h2>
      </div>

      <p className="mt-4 text-slate-600 dark:text-slate-300">
        Ask questions about your learning journey and receive personalized AI
        insights.
      </p>

      {/* Input */}
      <div className="mt-6">
        <textarea
          rows={3}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about your learning..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900"
        />

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleAsk}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Send size={18} />
                Ask AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Suggestions */}
      {!response && !loading && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Try asking
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => setQuestion(item)}
                className="rounded-full border border-slate-300 px-3 py-2 text-sm transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI Response */}
      {response && (
        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
            <div className="mb-2 flex items-center gap-2">
              <Brain className="text-emerald-600" size={18} />
              <h3 className="font-semibold">Answer</h3>
            </div>

            <p className="text-slate-700 dark:text-slate-300">
              {response.answer}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" size={18} />
              <h3 className="font-semibold">Reasoning</h3>
            </div>

            <p className="text-slate-700 dark:text-slate-300">
              {response.reasoning}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
            <div className="mb-2 flex items-center gap-2">
              <Target className="text-blue-500" size={18} />
              <h3 className="font-semibold">Recommendation</h3>
            </div>

            <p className="text-slate-700 dark:text-slate-300">
              {response.recommendation}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}