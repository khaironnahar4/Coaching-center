import Link from "next/link"

const Homepage = () => {
  return (
    <div className='flex items-center gap-4'>
      <Link className="bg-blue-500 text-white px-4 py-2 rounded" href="/admin">Admin Panel</Link>
      <Link className="bg-green-500 text-white px-4 py-2 rounded" href="/parent">Parent Page</Link>
      <Link className="bg-purple-500 text-white px-4 py-2 rounded" href="/teacher">Teacher Page</Link>
    </div>
  )
}

export default Homepage