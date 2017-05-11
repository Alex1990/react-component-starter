import React, { Component } from 'react';
import readme from '../README.md';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>
          <div className="wrap">
            <h1>{packageName}@{packageVersion}</h1>
          </div>
        </header>
        <main className="main">
          <div className="wrap">
            <section className="section">
              <h2 className="section-title">Examples</h2>
              <div className="section-content">
                {exampleDirs.length > 0 ?
                  <ul>{exampleDirs.map(v => <li key={v}><a href={v}>{v}</a></li>)}</ul> :
                  <p>There is no example</p>
                }
              </div>
            </section>
            <section className="section">
              <h2 className="section-title">README.md</h2>
              <div className="section-content markdown-body" dangerouslySetInnerHTML={{ __html: readme }}></div>
            </section>
          </div>
        </main>
        <div>
          {repository &&
            <a href={repository}>
              <img
                style={{ position: 'absolute', top: 0, right: 0, border: 0 }}
                src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
                alt="Fork me on GitHub"
                data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"
              />
            </a>
          }
        </div>
      </div>
    );
  }
}

export default App;
