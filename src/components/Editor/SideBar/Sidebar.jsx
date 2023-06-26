import React, {useState, useEffect } from 'react';
import { request } from "../../../utils/axios-utils"
import { useMutation, useQuery } from 'react-query';

// 🌿 css용 import 
import {
    Input,
    Ripple,
    initTE,
} from "tw-elements";
import Datepicker from "react-tailwindcss-datepicker"; 


/** 이미지 출력용 import **/
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//Menubar container
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// 🌿 custom hook
import useFormatDate from "../../../hooks/useFormatDate";

/** 기능component import **/
// import Nodechangebar from './Nodechangebar';

const fetchGallery = () => {
  return request({ url: 'api/gallery' });
}

const postApply = (datas) => {
    console.log('datas', datas)
    return request({ url:'/api/galleryTags' , method: 'POST', data: datas, headers: { 'Content-Type': 'application/json' } });
}

export default () => {
  {/* 🌿 사용 변수들- categories btns 관련 */}
  const buttonList = ['마케팅', '건설/토목', '비즈니스', '화학', '에너지', '자재/장비', '운송', '과학', '컴퓨터', '재무', '통신', '직업/교육', '뉴스', '사회', '레퍼런스', '기타'];
  const [activeBtns, setActiveBtns] = useState({})  
  
  {/* 🌿 사용 변수들- 날짜 입력 관련 */}  
  const [dates, setDates] = useState({ startDate: null, endDate: null }); 
  const formatData = useFormatDate();

  {/* 🌿 갤러리에 입력되는 데이터 hook */}
  const [images, setImages] = useState([]);

  {/* 🌿 get */}
  const { data: initialData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery, {
    onSuccess: (data) => {
        setImages(data);
        console.log('from /gallery', data);
    }
    });

  {/* 🌿 post */}
  const mutationApply = useMutation(postApply, {
      onSuccess: (data) => {
          console.log('post success', data);
          setImages(data);
      },
      onError: (error) => {
          console.log('post fail', error);
      }
  });


  {/* 🌿 사용 변수들- 닐짜 입력 관련 함수 */}  
  const handleValueChange = (newValue) => {
  console.log("newValue:", newValue);
  setDates({ startDate: newValue.startDate, endDate: newValue.endDate });
  }

  {/*🌿 태그 버튼이 눌리면  activeBtns 상태 변화 */}
  const tagBtnClick = (categories) => {
    setActiveBtns((prevState) => {
      const newState = { ...prevState, [categories]: !prevState[categories] };
      const activeBtns = Object.keys(newState).filter((key) => newState[key]);
      console.log('activeBtns', activeBtns);
      return newState;
    });
  };

  {/* 🌿 apply 버튼 클릭 -> post 보내는 함수 */}
  const applyBtn = () => {
    const datas = { tags : Object.keys(activeBtns), startDate: dates.startDate, endDate: dates.endDate};
    console.log('post sending:', datas);
    mutationApply.mutate(datas);
  };

  {/* 🌿 init 버튼 클릭 -> 변수들 초기화 하는 함수 */}
  const initBtn = () => {
    setActiveBtns({});
    setImages(initialData);
    setDates({ startDate: null, endDate: null });
  }

  useEffect(() => {
     initTE({ Ripple, Input });

  }, [ images]);

  //기본 노드용 onDragStart함수
  const onDragStartDefault = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragStart = (event, nodeType, imageURL, tags) => {    
    console.log('🌸before drag event: ', event.dataTransfer);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('data/imageurl', imageURL);
    event.dataTransfer.setData('data/tags', tags);
    
    // const afterData = event.dataTransfer.getData('application/reactflow');
    // const afterimg = event.dataTransfer.getData('data/imageurl');
    // const afterTags = event.dataTransfer.getData('data/tags');
    // console.log('🍎 after drag event: ', event.dataTransfer);
    
    // afterData = event.dataTransfer.getData('application/reactflow');
    // const afterimg = event.dataTransfer.getData();
    // console.log('👺 after data: ', afterData);
    // console.log('👺 after data: ', event.dataTransfer);
    // console.log('🌵 after img: ', afterimg);
    // console.log('🌵 afterTags: ', afterTags);
    
    event.dataTransfer.effectAllowed = 'move';
  }

  {/* 🌿 카테고리 버튼그룹 매핑 관련 */}
  const buttonGroups = [];
  const buttonsPerGroup = 4;

  for (let i = 0; i < buttonList.length; i += buttonsPerGroup) {
    buttonGroups.push(buttonList.slice(i, i + buttonsPerGroup));
  }

  return (
    <div>
      {/* sidebar css 부분 */}
      <Paper sx={{     
        position: 'fixed', 
        width: 300,
        height: '100vh',
        top: '64px', 
        right: '60px', 
        backgroundColor: 'rgba(211,211,211,0.7)',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: 'rgb(255,255,255)'}}>
      <MenuList dense>
          {/* 🌿 Edit box제목 */}
          <h2 className="text-2xl font-semibold relative top-0 text-center text-violet-600">Edit box</h2>
          {/* 🌸 구분선 */}
          <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
          {/* 🌿 카테고리 버튼 리스트 */}
          <div className="text-md ml-4 mt-2 text-violet-600 p-1 rounded-lg ">
            카테고리 버튼</div>
          {/* 🌿 태그 버튼 mapping 구간 */}
          <div>
            {buttonGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mx-4 flex items-center justify-center">
                <div
                  className="overflow-x-auto mb-1 min-w-fit inline-flex font-bold text-purple-800 rounded-md shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
                  role="group"
                >
                  {group.map((btn, btnIndex) => (
                    <button
                      key={btn}
                      type="button"
                      onClick={() => tagBtnClick(btn)}
                      className={`inline-block min-w-fit text-inherit bg-neutral-50 text-sm px-2 py-2 uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200 ${
                        btnIndex === 0 ? "font-extrabold rounded-l pl-2" : btnIndex === group.length - 1 ? "rounded-r" : "pr-2"
                      }`}
                      data-te-ripple-init
                      data-te-ripple-color="light"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/*🌿 달력 입력 및 입력,초기화 버튼 구간*/}
            <div className='w-54 border-violet-800 border-1 rounded-sm mx-2'>
                <Datepicker 
                    value={dates} 
                    onChange={handleValueChange} 
                />
            </div>
            <div className="flex justify-center mt-1">
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={applyBtn}
                    className="h-8 mx-4 my-1 inline-block bg-purple-700 rounded bg-primary px-6 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        apply
                    </span>
                </button>

                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={initBtn}
                    className="h-8 mx-4 my-1 inline-block bg-purple-700 rounded bg-primary px-6 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        init
                    </span>
                </button>
            </div>

        {/* 🌸 구분선 */}
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        {/* 🌸 이미지 모아볼 수 있는 미니 갤러리 */}
        <div className="text-md ml-4 mt-2 text-violet-600 p-1 rounded-lg ">
            이미지 노드 <p className='text-xs'>편집창에 끌어다 놓아보세요!</p></div>
        <ImageList cols={3} gap={6} sx={{ padding: '10px', height: '250px'}}>
          {images && images?.data?.map((image, index) => (
            <ImageListItem key={image.id} className ='max-h-22'>
              <img 
                src={image.thumbnailUrl}
                className="imgNode max-h-16 "
                loading="lazy"
                onDragStart={(event) => onDragStart(event, 'pix', image.url, Object.values(image.tags))}
                draggable
                alt="Gallery Item" />
              <span  className='text-violet-800 max-h-6' key={index} style={{ fontSize: '8px', padding:'2px'}}>
                {Object.values(image.categories).slice(0, 2).map((categories, index) => {
                  return (index < Object.values(image.categories).length - 1 && index !== 1) ? `${categories}, ` : categories;
                })}
              </span>
            </ImageListItem>
          ))}    
        </ImageList>

        
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        <MenuItem style={{display: 'flex', justifyContent: 'center'}}>
          <div className="TextNode inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
          onDragStart={(event) => onDragStartDefault(event, 'TextNode')} draggable>
            Text Node
          </div>
        </MenuItem>  
            {/* <Nodechangebar/> */}
         </MenuList>
        </Paper>
    </div>
  );
};
