import clsx from 'lib/utilities/clsx'
import React from 'react'

export const PrimaryButton = ({ className, children, ...props }) => (
  <button { ...props } className={ clsx('button-primary px-6 py-3', className) } type='button'>
    { children }
  </button>
)

export const SecondaryButton = ({ className, children, ...props }) => (
  <button { ...props } className={ clsx('button-secondary px-3 py-3', className) } type='button'>
    { children }
  </button>
)
