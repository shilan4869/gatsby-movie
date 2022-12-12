import clsx from 'lib/utilities/clsx'
import React from 'react'
import Link from 'lib/components/Link'

export const PrimaryButton = ({ className, children, ...props }) => (
  <button
    { ...props }
    className={ clsx('button-primary px-10 sm:px-6 py-3', className) }
    type='button'
  >
    { children }
  </button>
)

export const SecondaryButton = ({ className, children, ...props }) => (
  <button
    { ...props }
    className={ clsx('button-secondary p-3', className) }
    type='button'
  >
    { children }
  </button>
)

export const Tags = ({ className, children, ...props }) => (
  <Link
    { ...props }
    className={ clsx('rounded-full px-4 p-2 bg-black-25 opacity-80 hover:bg-black-10 hover:opacity-100 hover:no-underline duration-200 border border-white', className) }
  >
    { children }
  </Link>
)
