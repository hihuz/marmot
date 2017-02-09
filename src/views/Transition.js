import React from 'react';
import { connect } from 'react-redux';
import Link from 'react-router/Link';

const Transition = ({ title, left, right, hideTransition }) => (
  <main className="transition-screen basic-shit-show">
    <div className="transition-content">
      <div className="text-centered">
        {title}
      </div>
      <div className="transition-image">
      </div>
      <div className="transition-nav">
        <Link
          to={`/${left.path}`}
          onClick={hideTransition}
          className="transition-link"
        >
          <i className="icon-share flipped-icon"></i>
          <div className="transition-left-text">{left.text}</div>
        </Link>
        <Link
          to={`/${right.path}`}
          onClick={hideTransition}
          className="transition-link"
        >
          <i className="icon-share"></i>
          <div className="transition-right-text">{right.text}</div>
        </Link>
      </div>
    </div>
  </main>
);

export default Transition;
