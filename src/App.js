import React from 'react';
import SharedSelectText from 'react-share-selected-text';
import projects from '../package.json';
import content from './content.json';
import 'react-share-selected-text/lib/index.min.css';
import './App.css';

function App() {
  const buttons = [
    { icon: 'wechat', onClick: () => console.log('click wechat') },
    { icon: 'twitter' },
    { icon: 'facebook' },
    { icon: 'weibo' }
  ]
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-head-project-name">{projects.name}</h1>
        <h3 className="App-head-description">{projects.description}</h3>
        <a className="App-link btn" href={projects.repository}>View on Github</a>
      </header>
      <main className="App-body">
        <h2 className="App-body-usage">Usage: Here is an article that warpped by SharedSelectText</h2>
        <section>
          <h1 className="App-body-title">{content.title}</h1>
          <h3 className="App-body-subtitle">{content.subtitle}</h3>
          <SharedSelectText buttons={buttons} buttonsClassName="App-body-content" timeout={150}>
            <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
          </SharedSelectText>
        </section>
      </main>
    </div>
  );
}

export default App;
