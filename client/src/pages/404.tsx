import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-4xl font-bold mb-4">404</h1>

      <p className="text-lg mb-6">
        Page not found
      </p>

      <Link
        href="/"
        className="px-5 py-2 bg-blue-600 text-white rounded"
      >
        Go to Home
      </Link>
    </div>
  )
}
