import React, { useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

//데이터 수신용 코드
import { useDetailStore } from '../store';

//css용 import 
import {
  Ripple,
  initTE,
} from "tw-elements";
import { image } from 'd3';


function DetailShow() {

  {/* 🐼 mypage에서 전송받은 변수 */}
  const imageData = useDetailStore(state => state.recentImg)

  {/* 🐼 태그 추가 용 input창 */}
  const inputRef = useRef()

  {/* 🐼 태그 추가용 함수 */}
  const addTag = () =>{
    console.log(inputRef.current.value)
  }


  {/* 🌿 변수들이 변하면 재렌더링을 위한 hook*/}
  useEffect(() => {
    if (imageData) {
      initTE({ Ripple });
      console.log('detailshow에 전달받았습니다!!!', imageData)
    }
  }, [imageData]);


  return (
    <div className=" mx-6 mb-20 p-4 pb-8 rounded-lg h-7/12 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="relative overflow-hidden bg-cover bg-no-repeat flex items-center justify-center"
          data-te-ripple-init
          data-te-ripple-color="light">
          <Link to={imageData.url}>
            <img
                className="rounded-t-lg h-32 object-cover mt-2"
                src={imageData.url}
                alt=""
                style={{ objectPosition: 'center' }} />
          </Link>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          
      </div>
    <div className="p-6">
      <span className="mb-2 mr-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        카테고리: 
      </span>
          <span className="inline-block text-md">
          {imageData.categories && Object.values(imageData.categories).map((category, index) => (
            <span key={index}>{category}{index < Object.values(imageData.categories).length - 1 ? ', ' : ''}</span>
        ))}
        </span>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 ">
      태그들 : {imageData.tags && Object.values(imageData.tags).map((tag, index) => (
            <span key={index}>{tag}{index < Object.values(imageData.tags).length - 1 ? ', ' : ''}</span>
          ))}
      </p>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 ">
        시간 : {imageData.time}
      </p>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 ">
        장소 : {imageData.location}
      </p>
    {/* 🌿 태그 추가 /삭제 */}
    <div className="relative mt-2 flex w-fit h-4 flex-wrap justify-center item-center">
        <input
        type="text"
        className="relative -mr-0.5 -ml-2 block min-w-0 flex-auto rounded-md border border-solid border-neutral-300 bg-transparent bg-clip-padding px-5 py-2 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-purple-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder=" 추가하고 싶은 태그를 입력하세요."
        aria-label="input"
        aria-describedby="button-addon3"
        ref={inputRef}/>

        <button
        className="relative z-[2] my-2 mx-2 border-2 rounded-md border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-purple hover:bg-opacity-5 focus:outline-none focus:ring-0"
        type="button"
        id="button-addon3"
        onClick={addTag}
        data-te-ripple-init>
        태그추가
        </button>
        <button
        className="relative z-[2] mx-2 my-2 border-2 rounded-md border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-purple hover:bg-opacity-5 focus:outline-none focus:ring-0"
        type="button"
        id="button-addon3"
        onClick={addTag}
        data-te-ripple-init>
        태그삭제
        </button>
    </div>
    </div>
  </div>
  )
}

export default DetailShow
