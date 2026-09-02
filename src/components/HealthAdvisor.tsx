import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { analyzeReport } from "@/lib/health.functions";

type Result = {
  summary?: string;
  recommendations?: { name: string; reason: string; serving?: string }[];
  avoid?: string[];
  disclaimer?: string;
};

export function HealthAdvisor() {
  const run = useServerFn(analyzeReport);
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [result, setResult] = useState<Result | undefined>();

  const onFile = (f: File | null) => {
    if (!f) return;
    setFileName(f.name);
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(String(reader.result));
    reader.readAsDataURL(f);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setResult(undefined);
    if (!text.trim() && !imageDataUrl) {
      setError("Paste your report text or upload an image of it.");
      return;
    }
    setLoading(true);
    try {
      const r = await run({
        data: { text: text.trim() || undefined, imageDataUrl, notes: notes.trim() || undefined },
      });
      setResult(r as Result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="advisor" className="py-28 px-6 bg-secondary/40 border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <span className="text-[11px] tracking-[0.25em] uppercase text-primary font-semibold">
            Personal Pairing
          </span>
          <h2 className="font-serif text-4xl md:text-5xl italic leading-tight text-balance">
            Upload your medical report.
            <br />
            We'll suggest the right handful.
          </h2>
          <p className="text-foreground/65 max-w-xl mx-auto">
            Paste a blood-work summary or upload a photo of your report. Our nutrition assistant
            will recommend dry fruits from our catalogue that suit you.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid md:grid-cols-2 gap-6 bg-background rounded-3xl p-6 md:p-10 ring-1 ring-border shadow-sm"
        >
          <div className="space-y-4">
            <label className="block">
              <span className="text-[11px] tracking-[0.2em] uppercase text-foreground/60 font-medium">
                Report text
              </span>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                placeholder="e.g. Hemoglobin 11.2 g/dL, LDL 145, Fasting glucose 108, Vitamin D 18 ng/mL…"
                className="mt-2 w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-[11px] tracking-[0.2em] uppercase text-foreground/60 font-medium">
                Anything else? (optional)
              </span>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Age, allergies, diet preferences…"
                className="mt-2 w-full px-4 py-3 rounded-xl bg-secondary/60 border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              />
            </label>
          </div>

          <div className="space-y-4">
            <label className="block cursor-pointer">
              <span className="text-[11px] tracking-[0.2em] uppercase text-foreground/60 font-medium">
                Or upload a photo
              </span>
              <div className="mt-2 rounded-xl border-2 border-dashed border-border bg-secondary/40 hover:bg-secondary/70 transition px-6 py-10 text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-sm font-medium">
                  {fileName ?? "Click to choose a report image"}
                </p>
                <p className="text-xs text-foreground/55 mt-1">
                  JPG or PNG — kept private, processed by AI
                </p>
              </div>
            </label>

            {imageDataUrl && (
              <img
                src={imageDataUrl}
                alt="Report preview"
                className="w-full max-h-48 object-contain rounded-lg ring-1 ring-border"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-full font-medium tracking-wide hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Reading your report…" : "Get my dry-fruit pairing"}
            </button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </form>

        {result && (
          <div className="mt-10 bg-background rounded-3xl p-6 md:p-10 ring-1 ring-border space-y-6">
            {result.summary && (
              <div>
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-primary font-semibold mb-2">
                  Summary
                </h3>
                <p className="text-lg leading-relaxed">{result.summary}</p>
              </div>
            )}
            {result.recommendations && result.recommendations.length > 0 && (
              <div>
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-primary font-semibold mb-4">
                  Your handful
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {result.recommendations.map((r, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-secondary/50 border border-border">
                      <p className="font-serif text-xl italic">{r.name}</p>
                      <p className="text-sm text-foreground/70 mt-1">{r.reason}</p>
                      {r.serving && (
                        <p className="text-[11px] tracking-[0.2em] uppercase text-foreground/55 mt-3">
                          Serving · {r.serving}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.avoid && result.avoid.length > 0 && (
              <div>
                <h3 className="text-[11px] tracking-[0.25em] uppercase text-primary font-semibold mb-2">
                  Go easy on
                </h3>
                <ul className="list-disc pl-5 text-sm text-foreground/75 space-y-1">
                  {result.avoid.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.disclaimer && (
              <p className="text-xs text-foreground/55 italic border-t border-border pt-4">
                {result.disclaimer}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
