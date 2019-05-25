import React from 'react'

export const Link = ({className, children, href}) => {
  function onClick(e) {
    console.log('hey');
    e.preventDefault();
    window.history.replaceState({},'bla', href);
  }
  return (
    <a className={className} href={href}>
      {children}
    </a>
  )
}
