import LayoutBuilder from "./components/LayoutBuilder"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
          Interactive Layout Builder
        </h1>
        <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
          Create responsive layouts using Flexbox and Grid with direct mouse manipulation. See the Tailwind CSS code
          generated in real-time.
        </p>
        <LayoutBuilder />
      </div>
    </main>
  )
}

