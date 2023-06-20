import React, {useState, useEffect } from 'react';
import { request } from "../../../utils/axios-utils"
import {useQuery } from 'react-query';


/** 이미지 출력용 import **/
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

//Menubar container
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


/** 기능component import **/
import FileUpload from './FileUpload';
import GallerySearch from './GallerySearch';
import TimeBar from './TimeBar';
import TagButtons from './TagButtons';
import Nodechangebar from './Nodechangebar';

const fetchGallery = () => {
  return request({ url: 'api/gallery' });
}

export default () => {

  const [images, setImages] = useState([]);
  const { data: initialData, isLoading, isError, error } = useQuery('imagesQuery', fetchGallery);

    useEffect(() => {
        if (!isLoading && initialData) {
            setImages(initialData.data);
        }
    }, [isLoading, initialData]);

  //기본 노드용 onDragStart함수
  const onDragStartDefault = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  {/*편집창에서 Node데이터 이동의 시작점*/}
  const onDragStart = (event, nodeType, imageURL, tags) => {
    
    console.log('🌸before drag event: ', event.dataTransfer);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('data/imageurl', imageURL);
    event.dataTransfer.setData('data/tags', tags);
    
    const afterData = event.dataTransfer.getData('application/reactflow');
    const afterimg = event.dataTransfer.getData('data/imageurl');
    const afterTags = event.dataTransfer.getData('data/tags');
    // console.log('🍎 after drag event: ', event.dataTransfer);
    
    // afterData = event.dataTransfer.getData('application/reactflow');
    // const afterimg = event.dataTransfer.getData();
    console.log('👺 after data: ', afterData);
    // console.log('👺 after data: ', event.dataTransfer);
    // console.log('🌵 after img: ', afterimg);
    console.log('🌵 afterTags: ', afterTags);
    
    event.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div>
      {/* sidebar css 부분 */}
      <Paper sx={{     
        position: 'fixed', 
        width: 270,
        height: '100vh',
        top: '58px', 
        right: '60px', 
        backgroundColor: 'rgba(211,211,211,0.7)',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: 'rgb(255,255,255)'}}>
      <MenuList dense>
        <MenuItem>
          <Typography sx={{paddingRight: 3 }}>사이드 바</Typography>
        </MenuItem>
        
        <div> <TimeBar /> </div>
        <div> <TagButtons/> </div>
        <div> <GallerySearch /></div>

        {/* 🌸 구분선 */}
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        {/* 🌸 이미지 모아볼 수 있는 미니 갤러리 */}
         <ImageList cols={3} gap={6} sx={{ padding: '10px', height: '250px'}}>
            {images && images.map((image, index) => (
                <ImageListItem key={image.id} sx={{border: 'solid 1px white'}}>
                    <img 
                        src={image.thumbnailUrl}
                        className="imgNode"
                        loading="lazy"
                        onDragStart={(event) => onDragStart(event, 'pix',image.url, Object.values(image.tags))}
                        draggable
                        alt="Gallery Item"
                        style={{ height: '60px'}} />
                            <span style={{ fontSize: '8px', padding:'2px'}}>
                                {Object.values(image.tags).slice(0, 2).map((tag, index) => {
                              return (index < Object.values(image.tags).length - 1 && index !== 1) ? `${tag}, ` : tag;
                                })}
                            </span>
                </ImageListItem>
            ))}    
        </ImageList>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
            <Nodechangebar/>
            <MenuItem style={{display: 'flex', justifyContent: 'center'}}>
          <div className="TextNode inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
          onDragStart={(event) => onDragStartDefault(event, 'TextNode')} draggable>
            텍스트 노드 드래그로 추가
          </div>
        </MenuItem>  
         </MenuList>
        </Paper>
    </div>
  );
};
