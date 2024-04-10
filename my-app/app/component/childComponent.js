// テスト用

import React from 'react';

const ChildComponent = (props) => {
  return (
    <div>
      {/* ボタンをクリックするとincrement関数が呼ばれる */}
      <button onClick={props.increment}>Increment</button>
    </div>
  );
};

export default ChildComponent;
