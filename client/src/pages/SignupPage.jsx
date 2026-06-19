import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md">
      <Card className="p-8">
        <h1 className="text-lg font-semibold text-ink-950">Create your account</h1>
        <p className="mt-1 text-sm text-ink-500">
          Account creation is coming in a future release — this is a preview of the sign-up flow.
        </p>

        <form className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-ink-700">
            Full name
            <input
              type="text"
              disabled
              placeholder="Ada Lovelace"
              className="rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 placeholder:text-ink-300 disabled:bg-ink-50"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-ink-700">
            Work email
            <input
              type="email"
              disabled
              placeholder="you@firm.com"
              className="rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 placeholder:text-ink-300 disabled:bg-ink-50"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-ink-700">
            Password
            <input
              type="password"
              disabled
              placeholder="••••••••"
              className="rounded-lg border border-ink-100 px-3 py-2 text-sm text-ink-950 placeholder:text-ink-300 disabled:bg-ink-50"
            />
          </label>

          <button
            type="button"
            disabled
            className="mt-2 rounded-full bg-ink-950 px-4 py-2 text-sm font-medium text-white opacity-50"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Already have an account?{' '}
          <Link to="/sign-in" className="font-medium text-accent-600 hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
