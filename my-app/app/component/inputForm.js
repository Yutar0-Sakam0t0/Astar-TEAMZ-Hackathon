import React, { useState } from 'react';

const InputForm = (props) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(props.setValue(inputValue));
  };

  return (
    <div className="mt-3">
      <label htmlFor={props.htmlFor} className="block">{props.text}</label>
      <input 
        type={props.type} 
        id={props.id} 
        name={props.name} 
        className="w-full mt-1 border rounded-md p-2" 
        placeholder={props.placeholder} 
        value={inputValue} 
        onChange={handleChange} // 入力値が変更されたときにhandleChangeを呼び出す
      />
      <small className="form-text text-gray-400">{props.option}</small>
      {/* <p>helleo{inputValue}</p> */}

    </div>
  );
};

export default InputForm;
