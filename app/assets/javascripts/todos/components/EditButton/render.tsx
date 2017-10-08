import * as classNames from 'classnames'
import * as React from 'react'

export interface Props {
  className?: string
  disabled?: boolean
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void
}

export default function EditButton({
  className = '',
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={classNames('btn btn-default btn-xs', className)}
      disabled={disabled}
      aria-label="Edit"
      onClick={onClick}
    >
      <span className="glyphicon glyphicon-edit" aria-hidden="true" />
    </button>
  )
}
