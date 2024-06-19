import React from 'react'
import Link from 'next/link'

const TheNavbar = () => {
  return (
    <header className="max-w-screen-sm mx-auto">
      <nav className="flex gap-8 p-4 justify-between items-center">
        <Link href="/full-calendar">Full Calendar</Link>
        <Link href="/">Full Calendar</Link>
        <Link href="/">Full Calendar</Link>
        <Link href="/">Full Calendar</Link>
      </nav>
    </header>
  )
}

export default TheNavbar
