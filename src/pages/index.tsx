import { Inter } from 'next/font/google'
import { useState } from 'react'
import { ClipboardIcon, PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Button from '@/components/Button'

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
  const [value, setValue] = useState('')

  const getFlippedText = (str: string) => {
    let newStr = ''

    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      newStr = `${char}${newStr}`
    }

    return newStr
  }

  const [isCopied, setIsCopied] = useState(false)

  const clickCopy = (str: string) => {
    if (!isCopied) {
      setIsCopied(true)
      navigator.clipboard.writeText(str)

      setTimeout(() => setIsCopied(false), 1000)
    }
  }

  return (
    <div className={`w-screen min-h-screen ${inter.className} flex flex-col items-center justify-between`}>
      <header className='py-4'>
        <h1 className='text-xl'>Text Manipulator</h1>
      </header>

      <main className='w-full flex flex-col items-center'>
        <div className='relative group w-[90%]'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <PencilIcon className='w-4 h-4 text-gray-400 group-hover:text-gray-200' />
          </div>

          <input
            type='text'
            id='inp'
            placeholder='Type here...'
            required
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='block w-full p-4 ps-10 text-sm bg-gray-700 rounded-lg border border-gray-600 placeholder-gray-400 outline-none focus:border-gray-400 group-hover:border-gray-400 group-hover:placeholder-gray-200'
          />
        </div>

        {value ? (
          <div className='flex flex-col items-center'>
            <p className='my-4 text-center'>{isCopied ? 'Copied 👍' : getFlippedText(value)}</p>

            <Button onClick={() => clickCopy(getFlippedText(value))} icon={ClipboardIcon} label='Copy' />
          </div>
        ) : null}
      </main>

      <footer className='py-4'>
        <p className='text-sm'>
          Developed by{' '}
          <Link href='https://github.com/BenElferink' target='_blank' rel='noopener noreferrer' className='text-blue-400 cursor-pointer'>
            Ben Elferink
          </Link>
        </p>
      </footer>
    </div>
  )
}
