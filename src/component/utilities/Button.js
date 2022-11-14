import clsx from 'lib/utilities/clsx'
import React from 'react'

export const PrimaryButton = ({ className, children, ...props }) => (
  <button
    { ...props }
    className={ clsx('button-primary px-10 py-6 sm:px-6 sm:py-3', className) }
    type='button'
  >
    { children }
  </button>
)

export const SecondaryButton = ({ className, children, ...props }) => (
  <button
    { ...props }
    className={ clsx('button-secondary p-6 sm:p-3', className) }
    type='button'
  >
    { children }
  </button>
)
