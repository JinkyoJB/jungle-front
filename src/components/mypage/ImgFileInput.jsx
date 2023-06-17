import { Link } from 'react-router-dom'
import { useMutation } from 'react-query';
import React, { useState } from 'react';
import styled from 'styled-components'
//서버요청용
import { request } from "../../utils/axios-utils"

const ContentBox = styled.div`
  position: relative;
  top: 25px;
  padding: 10px;
  display: flex;
  flex-direction: column;  
  justify-content: center;
  align-items: center;
  background-color: #D8B2AD;
  width: 80%;
  height: 70%;
  border-radius: 10px;
`
const ContentContainer = styled.div`
  display: flex;
  position: fixed;
  left: 220px;
  justify-content: center;
  align-items: center;  
  width: calc(100vw - 220px);
  height: 400px;
  border-bottom:  solid 1px lightgray;
  overflow: hidden;
`;

const addImgFile = async (ImgData) => {
  const response = await request({ url: 'api/upload', method: 'post', data: ImgData });
  console.log(response?.data?.tags);
  return response;
}

const ImageUpload =() => {
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState(null); // 추가된 상태 변수
  const mutation = useMutation(addImgFile, {
    onSuccess: (data) => {
      console.log('image upload success');
      setTags(data?.data?.tags); // 응답에서 태그를 설정
    },
    onError: (error) => {
      console.log('image upload fail:', error);
    }
  });

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);
    mutation.mutate(formData);
  };

  return (
    <ContentContainer>
      <ContentBox>
        <h2 className="text-2xl font-semibold pb-6 relative top-0">Input your Photo</h2>
        <div className='flex justify-center space-x-4'>
          <div>
            {image && <img src={image} alt="Preview" className="w-70 h-40 object-cover" />}
          </div>
          <div className="flex flex-col justify-center space-y-5">
            <label className="flex items-center px-2 py-1 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 4a2 2 0 00-2 2v4a2 2 0 104 0V6a2 2 0 00-2-2zm0 12a6 6 0 01-6-6h2a4 40 108 0h2a6 6 0 01-6-6z" />
            </svg>
            <span className="ml-2 text-sm leading-normal flex justify-center my-2 mx-1">Select a file</span>
            <input type='file' className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
            <button onClick={handleUpload} className=" px-2 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-700 relative flex justify-center">Upload</button>
          </div>
        </div>
        <div className='flex space-x-4 text-lg'>
          <div className='my-2'>Result Tag:</div>
          <div className='my-2'>{tags}</div>
        </div>
      </ContentBox>
    </ContentContainer>
  );
}
export default ImageUpload;