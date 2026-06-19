import { Link } from 'react-router-dom';
import homeImage from '../assets/promisedland_hero.png';

export default function StartPage() {
  return (
    <div
      className="relative flex min-h-112 items-center justify-center overflow-hidden rounded-3xl bg-cover bg-center px-6 py-20 text-center sm:min-h-136"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="absolute inset-0 bg-ink-950/55" />

      <div className="relative mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold text-white sm:text-5xl">Welcome to Company Intelligence</h1>
        <p className="mt-4 text-lg text-white/90">
          Discover, analyze, and track private companies you didn&apos;t know exist.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="rounded-full bg-accent-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-accent-700"
          >
            Get started
          </Link>
          <Link
            to="/sign-in"
            className="text-sm font-medium text-white/90 underline-offset-4 hover:text-white hover:underline"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
