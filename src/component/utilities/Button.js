import clsx from 'lib/utilities/clsx'
import React from 'react'

export const PrimaryButton = ({ className, children, ...props }) => (
  <button
    { ...props }
    className={ clsx('button-primary px-10 py-6 md:px-6 md:py-3', className) }
    type='button'
  >
    { children }
  </button>
)

export const SecondaryButton = ({ className, children, ...props }) => (
  <button
    { ...props }
    className={ clsx('button-secondary p-6 md:px-3 md:py-3', className) }
    type='button'
  >
    { children }
  </button>
)
