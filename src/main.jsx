import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Volume2,
  VolumeX,
  X,
  Target,
  Shield,
  BarChart3,
  Lightbulb,
  CheckSquare,
  Calendar,
  Search,
  RefreshCw,
} from "lucide-react";
import { useLessonAudio } from "../../shared/useLessonAudio";
import "./styles.css";

const illustrationFiles = import.meta.glob("./assets/illustrations/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const img = (n) => illustrationFiles[`./assets/illustrations/${n}.png`];

const tabs = [
  "New Year's resolutions",
  "Retrospective heartbeat",
  "Five-stage structure",
  "One-improvement rule",
  "Predictive engines & PDCA",
  "Exam lens",
];

const reveals = {
  hook: {
    title: "Lesson 7.2.5 — Help Ensure Continuous Improvement Processes Are Updated",
    text: "Improvement works the same way in a project. Enabler 6.2's wording is precise: help ensure improvement processes are updated — the improvement machinery itself has to get improved, on a rhythm, not left to good intentions.",
    image: "hook-resolutions",
  },
  retro: {
    title: "The Retrospective: Improvement's Heartbeat",
    text: "The retrospective is a recurring, time-boxed, whole-team session held at each cadence boundary, examining the way of working — not the product, which is the review's job. It's the heartbeat that keeps improvement from becoming a once-in-a-while good intention.",
    image: "retrospective-heartbeat",
  },
  rule: {
    title: "The One-Improvement Rule and the Improvement Backlog",
    text: "A list of nine intentions survives contact with Monday for about an hour; one owned, scheduled item ships. That's the one-improvement rule. Improvements then queue in an improvement backlog — prioritized, statused, and reviewed like any other backlog — because improvement unmanaged is improvement abandoned. The improvement doesn't get to just live in someone's memory of a good meeting; it has to live somewhere trackable.",
    image: "one-improvement-backlog",
  },
  exam: {
    title: "Synthesis (Exam Lens)",
    text: "The retrospective is improvement's heartbeat on adaptive tracks: a recurring, whole-team session with a five-stage structure — set the stage, gather data, generate insight, decide on one improvement, and close it into the next cycle's capacity. The one-improvement rule is what separates teams that retrospect from teams that improve, and the improvement backlog keeps commitments tracked rather than forgotten. On predictive tracks, process audits and PDCA do the same work in different clothes — small, measured, reversible experiments, adopted, adjusted, or abandoned honestly. And enabler 6.2's deeper point is that the improvement machinery itself needs improving, not just the project it serves.",
    image: "exam-continuous-improvement",
    bullets: [
      "Five-stage retrospective structure: set the stage, gather data, generate insight, decide (ONE improvement), close (scheduled into next cycle)",
      "The one-improvement rule: one owned, sized, scheduled item beats a list of good intentions",
      "Improvements live in a tracked improvement backlog — unmanaged improvement is abandoned improvement",
      "PDCA: plan a small measured hypothesis, do it small and reversible, check against baseline, act by adopting, adjusting, or abandoning without embarrassment",
      "Enabler 6.2's meta-level: the improvement processes themselves must be updated over time, not just applied",
    ],
  },
};

const stages = [
  {
    title: "1. Set the Stage",
    text: "Psychological safety made explicit — the prime directive that everyone did the best they could with what they knew. This is the psychological safety deposit paying its dividend.",
    image: "stage-set-the-stage",
    icon: Shield,
  },
  {
    title: "2. Gather Data",
    text: "What actually happened — metrics before memories: blocked-days, escape counts, cycle times, plus the human reading of how it felt.",
    image: "stage-gather-data",
    icon: BarChart3,
  },
  {
    title: "3. Generate Insight",
    text: "Making sense of the data together — what it actually means, not just what it shows.",
    image: "stage-generate-insight",
    icon: Lightbulb,
  },
  {
    title: "4. Decide",
    text: "Pick ONE improvement — owned, sized, testable. Not a wish list.",
    image: "stage-decide",
    icon: CheckSquare,
  },
  {
    title: "5. Close",
    text: "Commit it into the next cycle's capacity, visibly. Not just discussed — scheduled.",
    image: "stage-close",
    icon: Calendar,
  },
];

const engines = [
  {
    title: "1. Process Audits and Quality Reviews",
    text: "Cousins of the risk audit, these examine whether the project's processes are followed and effective — and their findings are improvement fuel, not policing. An owner-update SLA, trigger quantification, and fallback drafting can all be process improvements delivered by an audit, not just a compliance checklist.",
    image: "engine-process-audits",
    icon: Search,
  },
  {
    title: "2. PDCA — The Universal Engine",
    text: "Plan a small change as a hypothesis with a measure. Do it small and reversible. Check the measure against baseline — measured, not felt. Act: adopt and standardize the win (routing it into the organizational process assets pipeline), adjust, or abandon without embarrassment.",
    image: "engine-pdca-wheel",
    icon: RefreshCw,
  },
];

const quizzes = [
  {
    q: "Scenario: At the end of a retrospective, a team generates a list of nine potential improvements they'd like to make. All nine are written on a whiteboard and photographed, but none are formally assigned an owner, sized, or scheduled into the next sprint's capacity. What is the most likely outcome, according to the one-improvement rule?",
    a: [
      "All nine improvements will likely be implemented gradually over the coming weeks",
      "Most or all of the nine improvements will likely not survive contact with the next sprint, since none were owned, sized, or scheduled",
      "The team should have generated even more improvement ideas to increase the odds that some would stick",
      "Photographing the whiteboard is sufficient to ensure the improvements are tracked and implemented",
    ],
    c: 1,
    g: "Correct! A list of intentions — however well-documented in a photo — isn't the same as one owned, sized, scheduled improvement. The one-improvement rule exists precisely because volume without ownership rarely survives the first busy Monday.",
    b: "Reconsider — more ideas doesn't improve the odds, and a photograph of a whiteboard isn't tracking; without ownership, sizing, and a scheduled slot, this list is very unlikely to survive past discussion.",
  },
  {
    q: "Scenario: A project manager runs a small experiment: shortening the daily stand-up format to reduce time spent, with a specific measure (average stand-up duration) tracked against a baseline before the change. After two weeks, the measured duration hasn't meaningfully improved, so the team reverts to the original format without any negative consequences attached to the decision. What does this best illustrate?",
    a: [
      "A failed experiment that reflects poorly on the project manager's judgment",
      "PDCA working correctly — the change was checked against a measured baseline, and abandoning it without embarrassment is a legitimate outcome, not a failure",
      "A violation of the one-improvement rule, since the change wasn't sized correctly",
      "A process audit finding, since the format change was examined for effectiveness",
    ],
    c: 1,
    g: "Correct! This is exactly what PDCA is supposed to look like — a small, reversible change, measured honestly against baseline, and abandoned without embarrassment when it doesn't pan out. That's a successful use of the cycle, not a failure.",
    b: "Reconsider — abandoning a measured experiment that didn't work is the system functioning correctly, not a reflection of poor judgment; this isn't about improvement sizing (one-improvement rule) or an audit finding — it's a PDCA cycle running as intended.",
  },
];

function Modal({ d, close, onComplete }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [close]);

  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      <section className="focus-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={close} aria-label="Close modal">
          <X size={20} />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={img(d.image)} alt="" />
            <h3>{d.title}</h3>
            <div className="modal-copy">
              <p>{d.text}</p>
            </div>
          </>
        ) : (
          <div className="modal-summary">
            <h3>Exam-Relevant Enablers to Remember</h3>
            <ul>
              {d.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}
        {d.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight size={18} />
          </button>
        ) : (
          <button
            className="modal-action"
            onClick={() => {
              if (onComplete) onComplete();
              close();
            }}
          >
            Mark as read <Check size={18} />
          </button>
        )}
      </section>
    </div>,
    document.body
  );
}

function Quiz({ d, finish }) {
  const [p, setP] = useState(null);
  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target size={18} /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{d.q}</h3>
        <div className="answers">
          {d.a.map((x, i) => (
            <button
              key={x}
              onClick={() => setP(i)}
              className={p === i ? (i === d.c ? "correct" : "wrong") : ""}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {x}
            </button>
          ))}
        </div>
        {p !== null && (
          <>
            <p className={`feedback ${p === d.c ? "good" : "bad"}`}>
              {p === d.c ? d.g : d.b}
            </p>
            <button className="finish-check" onClick={finish}>
              Finish check <ArrowRight size={18} />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body
  );
}

function App() {
  const [s, setS] = useState(0);
  const [done, setDone] = useState(Array(6).fill(false));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [sound, setSound] = useState(true);
  const [stageRead, setStageRead] = useState(Array(5).fill(false));
  const [ruleReviewed, setRuleReviewed] = useState(false);
  const [engineRead, setEngineRead] = useState(Array(2).fill(false));

  useLessonAudio(sound);

  const mark = (i = s) =>
    setDone((d) => d.map((x, j) => (j === i ? true : x)));
  const go = (i) => i >= 0 && i < 6 && (i <= s + 1 || done[i - 1]) && setS(i);

  useEffect(() => {
    if (s === 2 && stageRead.every(Boolean)) mark(2);
  }, [stageRead, s]);

  let c;

  if (s === 0)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">Lesson 7.2.5 — Help Ensure Continuous Improvement Processes Are Updated</p>
          <h1>Every January, people write down a list of ten resolutions.</h1>
          <p className="lead">
            Every January, people write down a list of ten resolutions. By February, none of them stick. But the person who picks just one resolution — small, specific, and scheduled — is usually still doing it in June.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => !done[0] && setModal("hook")}
          >
            {done[0] ? "Improvement machinery reviewed" : "Reveal improvement machinery"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("hook-resolutions")} alt="New Year resolutions vs single habit" />
      </div>
    );

  if (s === 1)
    c = (
      <div className="hero-layout">
        <div>
          <h2>The Retrospective: Improvement's Heartbeat</h2>
          <p className="lead">
            On adaptive tracks, one institution makes improvement inevitable rather than aspirational.
          </p>
          <button
            className="primary-cta"
            disabled={done[1]}
            onClick={() => !done[1] && setModal("retro")}
          >
            {done[1] ? "Retrospective heartbeat reviewed" : "Reveal retrospective heartbeat"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("retrospective-heartbeat")} alt="Retrospective rhythm" />
      </div>
    );

  if (s === 2)
    c = (
      <div className="wide-page">
        <h2>The Five-Stage Structure</h2>
        <p className="lead">
          A retrospective isn't just "let's talk about how it went." A five-stage structure keeps it honest. Click each to explore.
        </p>
        <div className="card-grid five">
          {stages.map((x, i) => {
            const Icon = x.icon;
            const isRead = stageRead[i];
            return (
              <button
                className={`click-card ${isRead ? "read" : ""}`}
                onClick={() => {
                  setStageRead((r) => r.map((v, j) => (j === i ? true : v)));
                  setModal({
                    title: x.title,
                    text: x.text,
                    image: x.image,
                  });
                }}
                key={x.title}
              >
                <span className="card-icon">
                  <Icon size={28} />
                </span>
                <strong>{x.title}</strong>
                {isRead ? (
                  <Check className="card-arrow check" size={20} />
                ) : (
                  <ArrowRight className="card-arrow" size={20} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );

  if (s === 3)
    c = (
      <div className="hero-layout">
        <div>
          <h2>The One-Improvement Rule and the Improvement Backlog</h2>
          <p className="lead">
            Back to that resolutions list one more time — because this is exactly the discipline that separates a team that retrospects from a team that actually improves.
          </p>
          <button
            className="primary-cta"
            onClick={() => setModal("rule")}
          >
            {ruleReviewed ? "Rule reviewed" : "Reveal one-improvement rule"}{" "}
            <ArrowRight size={18} />
          </button>
          {ruleReviewed && (
            <button
              className="knowledge-cta"
              style={{ marginTop: 14 }}
              onClick={() => setQuiz(0)}
            >
              <Target size={18} /> {done[3] ? "Retake knowledge check" : "Start knowledge check"}{" "}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
        <img className="lesson-art" src={img("one-improvement-backlog")} alt="One improvement backlog" />
      </div>
    );

  if (s === 4)
    c = (
      <div className="wide-page">
        <h2>Predictive-Side Engines: Process Audits and PDCA</h2>
        <p className="lead">
          Outside sprint cadences, the same muscle exists in different clothes. Click each engine to explore.
        </p>
        <div className="card-grid two">
          {engines.map((x, i) => {
            const Icon = x.icon;
            const isRead = engineRead[i];
            return (
              <button
                className={`click-card ${isRead ? "read" : ""}`}
                onClick={() => {
                  setEngineRead((r) => r.map((v, j) => (j === i ? true : v)));
                  setModal({
                    title: x.title,
                    text: x.text,
                    image: x.image,
                  });
                }}
                key={x.title}
              >
                <span className="card-icon">
                  <Icon size={28} />
                </span>
                <strong>{x.title}</strong>
                {isRead ? (
                  <Check className="card-arrow check" size={20} />
                ) : (
                  <ArrowRight className="card-arrow" size={20} />
                )}
              </button>
            );
          })}
        </div>
        {engineRead.every(Boolean) && (
          <>
            <div className="callout">
              <strong>The Meta-Level:</strong> Enabler 6.2's wording adds one more layer: help ensure improvement processes are updated. It isn't just about running retrospectives and audits — it's making sure the improvement machinery itself gets improved over time, rather than calcifying into its own stale ritual.
            </div>
            <button
              className="knowledge-cta centered"
              onClick={() => setQuiz(1)}
            >
              <Target size={18} /> {done[4] ? "Retake knowledge check" : "Start knowledge check"}{" "}
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    );

  if (s === 5)
    c = (
      <div className="exam-layout">
        <div className="exam-visual">
          <img src={img("exam-continuous-improvement")} alt="Synthesis PDCA" />
        </div>
        <div>
          <h2>Synthesis (Exam Lens)</h2>
          <p className="lead">
            Back to that resolutions list one final time — because the discipline was never about wanting to improve. It was about building the machinery that makes improvement actually happen.
          </p>
          <button
            className="primary-cta"
            disabled={done[5]}
            onClick={() => setModal("exam")}
          >
            {done[5] ? "Exam review complete" : "Reveal exam enablers"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="course-select">
          <span className="crumb">Module 7</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Lesson 7.2.5 — Help Ensure Continuous Improvement Processes Are Updated</span>
        </div>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${
                  i < 5 ? "done" : i === 5 ? "active" : ""
                }`}
                key={i}
              >
                {i < 5 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound(!sound)}>
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="ghost-button">
            <X size={16} />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {s + 1} OF 6</p>
              <div>
                {tabs.map((x, i) => (
                  <button
                    className={`${done[i] ? "done" : ""} ${
                      s === i ? "active" : ""
                    }`}
                    key={x}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check size={14} />}
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{c}</div>
            {done[s] && (
              <p className="completion">
                <Check size={16} /> Section complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!s}
                onClick={() => go(s - 1)}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <button
                className={`primary-button ${done[s] ? "unlocked" : ""}`}
                disabled={!done[s]}
                onClick={() => s < 5 && go(s + 1)}
              >
                Continue <ArrowRight size={16} />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal
          d={typeof modal === "string" ? reveals[modal] : modal}
          close={() => setModal(null)}
          onComplete={() => {
            if (modal === "hook") mark(0);
            if (modal === "retro") mark(1);
            if (modal === "rule") setRuleReviewed(true);
            if (modal === "exam") mark(5);
          }}
        />
      )}
      {quiz !== null && (
        <Quiz
          d={quizzes[quiz]}
          finish={() => {
            mark(quiz === 0 ? 3 : 4);
            setQuiz(null);
          }}
        />
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
