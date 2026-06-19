import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md">
      <Card className="p-8">
        <h1 className="text-lg font-semibold text-ink-950">Sign in</h1>
        <p className="mt-1 text-sm text-ink-500">
          Account access is coming in a future release— this is a preview of the sign-in flow.
        </p>

        <form className="mt-6 flex flex-col gap-4">
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
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-accent-600 hover:underline">
            Get started
          </Link>
        </p>
      </Card>
    </div>
  );
}
