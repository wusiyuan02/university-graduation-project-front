import React from "react";
import ReactDOM from "React-dom/client";
import style from './style.module.less';

const App = () => {
  return <div className={style.hello}>hello</div>;
}

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(<App />);