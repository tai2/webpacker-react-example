import * as classNames from 'classnames'
import * as React from 'react'

export interface Props {
  className?: string
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function EditButton({
  className = '',
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={classNames('btn btn-secondary btn-sm', className)}
      disabled={disabled}
      aria-label="Edit"
      onClick={onClick}
    >
      <i className="far fa-edit" aria-hidden="true" />
    </button>
  )
}
