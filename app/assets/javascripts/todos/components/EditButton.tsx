import * as React from 'react'
import * as classNames from 'classnames'

export interface Props {
  className: string,
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void,
}

export default function EditButton ({ className, onClick }: Props) {
  return (
    <button
      type="button"
      className={classNames('btn btn-default btn-xs', className)}
      aria-label="Edit"
      onClick={onClick}
    >
      <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
    </button>
  )
}
