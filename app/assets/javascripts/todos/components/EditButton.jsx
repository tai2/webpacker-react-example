import React from 'react';
import classNames from 'classnames';

export default function EditButton({ className, onClick }) {
  return (
    <button
      type="button"
      className={classNames('btn btn-default btn-xs', className)}
      aria-label="Edit"
      onClick={onClick}
    >
      <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
    </button>
  );
}
