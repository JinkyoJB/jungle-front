import React from 'react'

/** 이미지 출력용 import **/
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//Menubar container
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {useState} from 'react';

const NodeBox =() => {
  const [memoContent, setMemoContent] = useState(''); // 초기 값으로 '여기를 입력하세요!'을 설정

      //기본 노드용 onDragStart함수
  const onDragStartDefault = (event, nodeType, title) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('data/title', title);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <Paper sx={{     
        width: 420,
        height: '100vh',
        backgroundColor: 'rgba(211,211,211,0.7)',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: 'rgb(255,255,255)'}}>
      <MenuList dense>
        {/* 🌿 Edit box제목 */}
        <h2 className="text-2xl mt-1 font-semibold relative top-0 text-center text-violet-600">노드</h2>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        <div className="text-xl ml-4 mt-2 text-violet-600 p-1 rounded-lg ">
           텍스트 노드</div>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 bg-info my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'TextNode1')}
            draggable >
            <div>텍스트 노드1</div>
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 bg-info my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'TextNode2', '여기에 입력하세요!')}
            draggable >
            <div>텍스트 노드2</div>
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 bg-info my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'TextNode3')}
            draggable >
            <div>텍스트 노드3</div>
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 bg-info my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'TaskNameNode')}
            draggable >
            <div>텍스트 노드4</div>
          </div>
        </MenuItem>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />
        <div className="text-xl ml-4 mt-2 text-violet-600 p-1 rounded-lg ">
          메모 노드</div>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-700 my-2 bg-info px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) =>
               onDragStartDefault(event, 'MemoNode', 
                //여기는 무조건 변수가 되어야할 것 같아..
               ) 
            }
            draggable >
            <div>메모 노드</div>
          </div>
        </MenuItem>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} />


      </MenuList>
      </Paper>
    </div>
  )
}

export default NodeBox
