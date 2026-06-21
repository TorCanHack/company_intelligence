import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PERKS = ['40M+ company profiles', 'Funding, signals & org charts', '14-day trial · no card'];

export default function StartPage() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(pathname === '/sign-in' ? 'signin' : 'signup');
  const isSignup = mode === 'signup';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: authError } = isSignup
      ? await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
      : await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    navigate(state?.from?.pathname ?? '/home', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sketch-bg px-6 py-12 font-script">
      <Link to="/" className="fixed left-6 top-5 text-sm text-sketch-muted hover:text-sketch-text">
        ← Back to home
      </Link>

      <div className="flex w-full max-w-3xl overflow-hidden rounded-sm border border-sketch-border bg-white shadow-sm">
        <div className="hidden w-[44%] flex-none flex-col bg-sketch-heading p-8 sm:flex">
          <div className="mb-7 flex items-center gap-2">
            <span className="size-3.5 rounded-full bg-sketch-accent" />
            <span className="font-handwritten text-sm text-white">Company Intelligence</span>
          </div>

          <div className="font-handwritten text-2xl leading-tight text-white">
            Know any company
            <br />
            before the meeting
          </div>
          <p className="mt-3 max-w-[85%] text-sm text-white/60">
            Search 40M+ companies and get the full picture before you walk in.
          </p>

          <div className="mt-auto flex flex-col gap-2.5 pt-7">
            {PERKS.map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <Check className="size-3.5 flex-none text-sketch-accent" />
                <span className="text-sm text-white/70">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 flex-1 p-8">
          <div className="mb-6 flex rounded-lg bg-sketch-hover p-1">
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-md py-2 text-sm transition ${
                isSignup ? 'bg-white text-sketch-heading' : 'text-sketch-muted'
              }`}
            >
              Sign up
            </button>
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 rounded-md py-2 text-sm transition ${
                !isSignup ? 'bg-white text-sketch-heading' : 'text-sketch-muted'
              }`}
            >
              Sign in
            </button>
          </div>

          <h1 className="font-handwritten text-2xl text-sketch-heading">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mb-6 mt-1 text-sm text-sketch-muted">
            {isSignup ? 'Get started — free for 14 days.' : 'Sign in to continue.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {isSignup && (
              <label className="flex flex-col gap-1.5 text-xs text-sketch-label">
                Full name
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Jane Doe"
                  className="rounded-lg border-[1.5px] border-sketch-border px-3.5 py-2.5 text-sm text-sketch-text placeholder:text-sketch-label/70 disabled:bg-white"
                />
              </label>
            )}

            <label className="flex flex-col gap-1.5 text-xs text-sketch-label">
              Work email
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@firm.com"
                className="rounded-lg border-[1.5px] border-sketch-border px-3.5 py-2.5 text-sm text-sketch-text placeholder:text-sketch-label/70 disabled:bg-white"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-xs text-sketch-label">
              <span className="flex items-baseline justify-between">
                Password
                {!isSignup && <span className="text-[11px] text-sketch-accent">Forgot?</span>}
              </span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="rounded-lg border-[1.5px] border-sketch-border px-3.5 py-2.5 text-sm text-sketch-text placeholder:text-sketch-label/70 disabled:bg-white"
              />
            </label>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 block rounded-lg bg-sketch-accent py-3 text-center text-sm font-medium text-white disabled:opacity-60"
            >
              {submitting ? 'Please wait…' : isSignup ? 'Get started' : 'Sign in'}
            </button>
          </form>

          <div className="my-3.5 flex items-center gap-2.5">
            <span className="h-px flex-1 bg-sketch-border" />
            <span className="text-[11px] text-sketch-label">or</span>
            <span className="h-px flex-1 bg-sketch-border" />
          </div>

          <div className="flex gap-2.5">
            <div className="flex-1 rounded-lg border-[1.5px] border-sketch-border py-2.5 text-center text-sm text-sketch-muted">
              Google
            </div>
            <div className="flex-1 rounded-lg border-[1.5px] border-sketch-border py-2.5 text-center text-sm text-sketch-muted">
              SSO
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-sketch-label">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setMode(isSignup ? 'signin' : 'signup')}
              className="text-sketch-accent"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
