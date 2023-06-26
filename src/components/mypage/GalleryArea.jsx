import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// 🌿 http통신용 import
import { useMutation, useQuery } from 'react-query';
import { request } from "../../utils/axios-utils"

// 🌿 custom hook
import useFormatDate from '../../hooks/useFormatDate';
import { useDetailStore } from '../store';

// 🌿 css용 import 
import {
    Input,
    Ripple,
    initTE,
} from "tw-elements";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Datepicker from "react-tailwindcss-datepicker"; 
import { Divider } from '@mui/material';

//🌿custom function
const fetchGallery = () => {return request({ url: 'api/gallery' });}

const postApply = (datas) => {
    console.log('datas', datas)
    return request({ url:'/api/galleryTags' , method: 'POST', data: datas, headers: { 'Content-Type': 'application/json' } });
}

const postDelte = (datas) => {
    console.log('datas', datas)
    return request({ url:'/api/galleryDelete' , method: 'POST', data: datas, headers: { 'Content-Type': 'application/json' } });
}

const GalleryBox = () => {
    {/* 🌿 사용 변수들- tag btns 관련 */}
    const buttonList = ['마케팅', '건설/토목', '비즈니스', '화학', '에너지', '자재/장비', '운송', '과학', '컴퓨터', '재무', '통신', '직업/교육', '뉴스', '사회', '레퍼런스', '기타'];
    const [activeBtns, setActiveBtns] = useState({})

    {/* 🌿 갤러리에 렌더링 되는 데이터  */} 
    const [targetImgData, setTargetImgData] = useState('')

    {/* 🌿 사용 변수들- 닐찌 입력 관련 */}  
    const [dates, setDates] = useState({ startDate: null, endDate: null }); 
    const formatData = useFormatDate();

    {/* 🔴 사용 변수들- 중복선택 관련 , 사진 제거 관련 -> imgID기반 */}
    const [selectedImages, setSelectedImages] = useState([]);

    {/* 🔴  제일 최근에 클릭한 이미지가 detailshow에 보이도 도록 하는 hook*/}
    const selectRef = useRef();
    const detailTransfer = useDetailStore(state => state.changeRCImg);
    
    {/* 🌿 사용 변수들- 닐짜 입력 관련 함수 */}  
    const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDates({ startDate: newValue.startDate, endDate: newValue.endDate });
    }

    {/*🌿 태그 버튼이 눌리면  activeBtns 상태 변화 */}
    const tagBtnClick = (tag) => {
        setActiveBtns((prevState) => {
            const newState = { ...prevState, [tag]: !prevState[tag] };
            const activeBtns = Object.keys(newState).filter((key) => newState[key]);
            console.log('activeBtns', activeBtns);
            return newState;
        });
    };

    {/* 🌿 get */}
    const { data: initData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery, {
        onSuccess: (data) => {
            setTargetImgData(data);
            console.log('from /gallery', data);
        }
    });


    {/* 🌿 post */}
    const mutationApply = useMutation(postApply, {
        onSuccess: (data) => {
            setTargetImgData(data);
            console.log('post success', data);
        },
        onError: (error) => {
            console.log('post fail', error);
        }
    });

    const mutationDelete = useMutation(postDelte, {
        onSuccess: (data) => {
            setTargetImgData(initData)
            console.log('post success', data);
        },
        onError: (error) => {
            console.log('post fail', error);
        }
    });

    {/* 🌿 apply 버튼 클릭 -> post 보내는 함수 */}
    const applyBtn = () => {
        const datas = { tags : Object.keys(activeBtns), startDate: dates.startDate, endDate: dates.endDate};
        console.log('post sending:', datas);
        mutationApply.mutate(datas);
    };

    {/* 🌿 init 버튼 클릭 -> 변수들 초기화 하는 함수 */}
    const initBtn = () => {
        setActiveBtns({});
        setTargetImgData(initData);
        setDates({ startDate: null, endDate: null });
    }

    {/* 🌿사진 클릭 시 중복 선택 실행되는 함수 */}
    const selectImgsClick = (imageId) => {
        setSelectedImages((prevSelectedImages) => {
        // 이미 선택된 이미지인지 확인
        const isSelected = prevSelectedImages.includes(imageId);

        if (isSelected) {return prevSelectedImages.filter((id) => id !== imageId);} // 이미 선택된 이미지일 경우 제거
        else {return [...prevSelectedImages, imageId];}// 선택되지 않은 이미지일 경우 추가 
        });
    };

    {/* 🌿사진 클릭 시 detailshow에 image데이터 전달하는 함수 */}
    const detailClick = (image) => {
        selectRef.current = image;
        detailTransfer(image)
    }

    {/* ⚠️테스트 필요!⚠️ 🌿targetImgData에서 selectedImages에 있는 이미지 제외 후 남은 이미지 리스트를 반환하는 함수  */}
    // const removeRender = () => {
    // setTargetImgData((prevTargetImgData) => {
    //     if (Array.isArray(prevTargetImgData)) {
    //     const filteredData = prevTargetImgData.filter((image) => !selectedImages.includes(image._id));
    //     console.log('Remaining images:', filteredData);
    //     return filteredData;
    //     } else {
    //     console.log('prevTargetImgData is not an array:', prevTargetImgData);
    //     return prevTargetImgData;
    //     }
    // });
    // };

    {/* 🌿삭제 버튼이 눌리면 실행되는 함수 - DB에 삭제 요청, 렌더링에서 빼기 */}
    const deleteClick = () =>{
        const datas = { id : Object.values(selectedImages)};
        //무엇을 삭제할 건지 콘솔 확인
        console.log('delete post sending:', datas);
        //backend에 DB 데이터 삭제 요청
        mutationDelete.mutate(datas);
        //삭제요청 이미지를 갤러리 렌더링에서 제외
        // const updatedData = removeRender();
        // setTargetImgData(updatedData);
        setTargetImgData(initData);
    }

    {/* 🌿 변수들이 변하면 재렌더링을 위한 hook*/}
    useEffect(() => {
        initTE({ Ripple, Input });
        console.log(selectedImages)
    },[targetImgData || selectedImages]);

    if(isLoading) {return <h2>Loading...</h2>}
    if(isError) {return <h2>{error.message}</h2>}
    /* ---------------------------------------------------------------------------------- */
    return (
    <div className='mx-4 my-2'>
        {/* 🌿 제목 및 '새프로젝트 버튼' 구간*/}
        <div className='flex flex-wrap mt-16 m-2 p-4 justify-between'>
            <p className='mt-6 tracking-tight text-3xl text-purple-800 font-semibold'>My Gallery </p>
             <Link to="/modal">
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="mt-6 inline-block bg-purple-700 rounded bg-primary mr-8 px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        새 프로젝트
                    </span>
                </button>
            </Link>
        </div>
        <Divider />
        {/* 🌿 태그 버튼 mapping 구간1 */}
        <div className="mx-4 mt-8 my-4 flex items-center justify-center">
            <div
            className="overflow-x-auto min-w-fit inline-flex font-extrabold text-purple-800 rounded-md shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            role="group">
                <button
                    type="button"
                    onClick={() => tagBtnClick(buttonList[0])}
                    className="inline-block min-w-fit font-extrabold rounded-l text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {buttonList[0]}
                </button>
                {buttonList.slice(1, 7).map((btn) => (
                <button
                    key={btn}
                    type="button"
                    onClick={() => tagBtnClick(btn)}
                    className="inline-block min-w-fit text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {btn}
                </button>
                ))}
                <button
                    type="button"
                    onClick={() => tagBtnClick(buttonList[7])}
                    className="inline-block min-w-fit text-inherit rounded-r bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {buttonList[7]}
                </button>
            </div>
        </div>
        {/* 🌿 태그 버튼 mapping 구간2 */}
        <div className="mx-4 mb-4 flex items-center justify-center">
            <div
            className=" overflow-x-auto inline-flex font-extrabold text-purple-800 rounded-md shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            role="group">
                <button
                type="button"
                onClick={() => tagBtnClick(buttonList[8])}
                className="button-className min-w-fit inline-block font-extrabold rounded-l text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                data-te-ripple-init
                data-te-ripple-color="light">
                {buttonList[8]}
                </button>
                {buttonList.slice(9, 15).map((btn) => (
                <button
                    key={btn}
                    type="button"
                    onClick={() => tagBtnClick(btn)}
                    className="button-className min-w-fit inline-block text-inherit bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {btn}
                </button>
                ))}
                <button
                    type="button"
                    onClick={() => tagBtnClick(buttonList[15])}
                    className="button-className min-w-fit inline-block text-inherit rounded-r bg-neutral-50 px-6 pb-2 pt-2.5 text-lg uppercase leading-normal text-neutral-800 transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none focus:ring-0 active:bg-neutral-200"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {buttonList[15]}
                </button>
            </div>
        </div>
        {/*🌿 태그 버튼 결과값 창 */}
        <div className='flex'>
            <p className='min-w-fit ml-4 my-2 border-b-1 tracking-tight text-md text-purple-800 font-semibold'>선택된 카테고리 :</p>
            {Object.entries(activeBtns).filter(([key, value]) => value === true).map(([key]) => (
                <p key={key} className='overflow-x-auto min-w-fit mx-1 ml-4 my-2 border-b-1 tracking-tight text-md text-purple-800 font-semibold'>
                    {key}
                </p>
            ))}
        </div>
        {/*🌿 달력 입력 및 입력,초기화 버튼 구간*/}
        <div className='mb-8 bg-gray-100 p-4 justify-between flex mx-4'>
            <div className='w-80 border-violet-800 border-1 rounded-sm ml-8'>
                <Datepicker 
                    value={dates} 
                    onChange={handleValueChange} 
                />
            </div>
            <div>
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={applyBtn}
                    className="mx-4 inline-block bg-purple-700 rounded bg-primary px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        apply
                    </span>
                </button>

                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={initBtn}
                    className="mx-4 mr-10 inline-block bg-purple-700 rounded bg-primary px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    <span className="flex items-center">
                        init
                    </span>
                </button>
            </div>
        </div>
        <div className='mx-4'>
        <Divider />
        </div>
        {/*🌿이미지 갤러리 창*/ }
        <div className="container mx-auto px-5 py-2 lg:px-16 lg:pt-12">
            <ImageList sx={{ width: '100%', height: 450, gap: 16 }} cols={3} rowHeight={164}>
                <React.Fragment>
                {targetImgData?.data?.map((image) => (
                    <ImageListItem key={image._id} onClick={() => {
                        selectImgsClick(image._id)
                        detailClick(image);
                        }}>
                    <img
                        key={image._id}
                        src={`${image.url}?w=248&fit=crop&auto=format`}
                        alt='loading...'
                        loading="lazy"
                            style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease-in-out',
                            filter: selectedImages.includes(image._id) ? 'brightness(50%)' : 'brightness(100%)',
                        }}
                    />
                    <ImageListItemBar
                        title={
                            <span className='flex'>
                                {Object.values(image.categories).map((category, index,array) => {
                                    const isLast = index === array.length - 1;
                                    return (
                                    <React.Fragment key={index}>
                                        <p>{category}</p>
                                        {!isLast && <p>,</p>}
                                    </React.Fragment>
                                    );
                                })}
                            </span>
                        }

                        subtitle={
                            <span>{formatData(image.time)}</span>
                        }
                        position="bottom"
                    />
                    </ImageListItem>
                ))}
                </React.Fragment>
            </ImageList>
        </div>
        {/*🌿이미지 삭제 버튼 */ }
        <div className='flex justify-end mr-8 mb-2'>
            <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={()=>deleteClick()}
                className="mx-4 inline-block bg-purple-700 rounded bg-primary px-6 pb-2 pt-2.5 text-md font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                <span className="flex items-center">
                    delete
                </span>
            </button>
        </div>
    </div>

    );
};

export default GalleryBox;
