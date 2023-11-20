"use client"

import React, { useState, useEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineClose } from 'react-icons/ai'; // 추가
import StyledButton from '../../../../../(components)/(styledbutton)/styledbutton';
import styles from './Inputform.module.css'
import axios from 'axios';

// type InputFormProps = {
//   onSave: (data: string) => void;
// };

type InputEntry = {
  id: number;
  value: string;
  sight1: string;
  sight2: string;
  sight3: string;
};

export default function InputForm () {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(Number);
  const [inputHistory, setInputHistory] = useState<InputEntry[]>([]);
  const [selectedSight1, setSelectedSight1] = useState(''); 
  const [selectedSight2, setSelectedSight2] = useState('');
  const [selectedSight3, setSelectedSight3] = useState('');

  useEffect(() => {
    const savedHistory = localStorage.getItem('inputHistory');
    if (savedHistory) {
      setInputHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inputHistory', JSON.stringify(inputHistory));
  }, [inputHistory]);

  const handleButtonClick = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = async () => {
    // console.error('handleSaveClick 돌아가는중')
    try {
      const path = window.location.pathname.split('/');
      const word = decodeURI(path[1]);
      const server = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
      const instance = '/questionRoutes/makequestions';
      const tags = [selectedSight1, selectedSight2, selectedSight3];
      console.error('inputValue :', inputValue);
      setLoading(1);
      setInputVisible(false);
      const response = await axios.post(server + instance, { word, question: inputValue, tags: tags });
      // setquestions(response.data.questions);
      console.error(inputVisible, ': handleSaveClick 다 돌아감');
      setLoading(2);
      setInputValue('');
      setSelectedSight1(''); 
      setSelectedSight2('');  
      setSelectedSight3('');
    } catch (error: any) {
        console.error('error 발생 in handleSaveClick function')
    }
  };

  const handleClearClick = () => {
    setInputHistory([]);
    localStorage.removeItem('inputHistory');
  };

  const handleEntryDelete = (id: number) => {
    const newHistory = inputHistory.filter(entry => entry.id !== id);
    setInputHistory(newHistory);
  };

  return (
    <div >
      <div>
      {/* {inputHistory.map((entry) => (
        <div className={styles.entryStyle} key={entry.id}>
          <StyledButton>
            <h5>{`${entry.sight1} / ${entry.sight2} / ${entry.sight3}`}</h5>
            <p>{`${entry.value}`}</p>
            <span className={styles.deleteEntryButton} onClick={() => handleEntryDelete(entry.id)}>
              <AiOutlineClose size={12} /> 
            </span>
          </StyledButton>     
        </div>
      ))} */}
        {loading==1 && (
          <div className={styles.centerItems}>
            <h3>질문을 등록 중입니다... 30초 이상 걸린다면 새로고침 해주세요</h3>
          </div>
        )}

        {loading==2 && (
          <div className={styles.centerItems}>
            <h3>질문이 등록 완료되었습니다! GPT의 답변을 보시려면 새로고침 후, 자신의 질문을 클릭해 주세요</h3>
          </div>
        )}

        {!inputVisible && (
          <div className={styles.centerItems}>
            <button title='plusbutton' onClick={handleButtonClick} className={styles.buttonStyle}>
              <AiOutlinePlusCircle className={styles.iconStyle} />
            </button>
          </div>
        )}

        {inputVisible && (
          <div className={styles.centerItems}>
            <div className={styles.sidetoside}>
            <select 
                name='sight1'
                className={styles.select} 
                required
                value={selectedSight1}
                placeholder='학문1'
                onChange={(e) => setSelectedSight1(e.target.value)}>
              <option value=''>학문1(필수)</option>
              <option value='공학'>공학</option>
              <option value='교육학'>교육학</option>
              <option value='농수해양학'>농수해양학</option>
              <option value='사회과과학'>사회과학</option>
              <option value='의약학'>의약학</option>
              <option value='인문학'>인문학</option>
              <option value='자연과학'>자연과학</option>
              <option value='예술체육학'>예술체육학</option>
            </select>
            <select 
                name='sight2' 
                className={styles.select} 
                required
                value={selectedSight2}  
                onChange={(e) => setSelectedSight2(e.target.value)}
                > 
              <option value=''>학문2(필수)</option>
              <option value='공학'>공학</option>
              <option value='교육학'>교육학</option>
              <option value='농수해양학'>농수해양학</option>
              <option value='사회과학'>사회과학</option>
              <option value='의약학'>의약학</option>
              <option value='인문학'>인문학</option>
              <option value='자연과학'>자연과학</option>
              <option value='예술체육학'>예술체육학</option>
            </select>
            <select 
                name='sight3' 
                className={styles.select} 
                required
                value={selectedSight3}  
                onChange={(e) => setSelectedSight3(e.target.value)}
                >
              <option value=''>학문3(선택)</option>
              <option value='공학'>공학</option>
              <option value='교육학'>교육학</option>
              <option value='농수해양학'>농수해양학</option>
              <option value='사회과과학'>사회과학</option>
              <option value='의약학'>의약학</option>
              <option value='인문학'>인문학</option>
              <option value='자연과학'>자연과학</option>
              <option value='예술체육학'>예술체육학</option>
            </select>
            </div>
            <textarea
              id='textarea1'
              title='textarea1'
              rows={4}
              value={inputValue}
              onChange={handleInputChange}
              className={styles.textareaStyle}
            />
            <div className={styles.placesidetoside}>
              <div>
                <button 
                  type="button"
                  title='question'
                  id='question'
                  onClick={handleSaveClick}
                  className={styles.saveButtonStyle}
                >
                  질문
                </button>
              </div>
              &nbsp;
              <div>
                <button 
                  type="button"
                  title='delete'
                  id='delete'
                  onClick={handleClearClick}
                  className={styles.deleteButtonStyle}
                >
                  전체 삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 'use client'

// import InputForm from "./Inputform";
// import { useState } from "react";


// const ShowInputform = () => {
//     const [savedData, setSavedData] = useState<string>(''); // 'savedData' 타입 지정
  
//     const handleSave = (data: string) => { // 'data'의 타입을 'string'으로 지정
//       setSavedData(data);
//     };

  
//     return (
//       <div>
//         <br/> 
//         <InputForm onSave={handleSave} />
//         {savedData && <form id='saveddata'> {savedData} </form>}
//       </div>
//     );
//   };
  
  // export default ShowInputform;