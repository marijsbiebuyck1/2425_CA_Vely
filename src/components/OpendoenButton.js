import React from 'react';
import styles from './OpendoenButton.module.css';

export default function OpendoenButton({
  children = 'Opendoen',
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type={props.type || 'button'}
      className={`${styles.button} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
