'use client'
import Image from 'next/image'
import { ThemeToggle } from './theme-toggle'
import { UserNav } from './user-nav'

const Navbar = () => {
  return (
    <div>
      <div className="flex h-12 max-h-12 items-center px-4 border-b relative">
        <a className="block" href="/admin/dashboard">
          <Image
            src="/imgs/mundo-logo.png"
            alt="mundo-logo"
            priority
            width={80}
            height={45}
            className="mx-auto h-[50px] w-full cursor-pointer rounded p-2"
          />
        </a>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}

export default Navbar
