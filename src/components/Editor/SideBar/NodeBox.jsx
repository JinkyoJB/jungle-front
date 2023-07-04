import React from 'react'


//Menubar container
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

const NodeBox =() => {

      //기본 노드용 onDragStart함수
  const onDragStartDefault = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div>
      <Paper sx={{     
        width: 420,
        height: '100vh',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        color: 'rgb(255,255,255)'}}>
      <MenuList dense>
        {/* 🌿 Edit box제목 */}
        <h2 className="text-3xl mt-1 font-bold relative top-0 text-center text-violet-900"> 텍스트 박스 </h2>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: '#23173B' }} />
        <div className="text-2xl ml-5 mt-2 text-violet-900 p-1 rounded-lg font-bold">
           Text</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(1, 130px)', justifyItems: 'center', gridAutoFlow: 'dense'}}>
          <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '30px'}}>
            <div className="TextNode inline-block rounded bg-purple-700 my-2 px-2 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]  justify-center" 
              onDragStart={(event) => onDragStartDefault(event, 'TextNode1')}
              draggable 
              style={{ height: 'fit-content', width: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src="/basicNode.png" alt="기본"/>
            </div>
          </MenuItem>
          <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px' }}>
            <div className="TextNode inline-block rounded bg-purple-700 my-2 px-2 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
              onDragStart={(event) => onDragStartDefault(event, 'TextNode2')}
              draggable 
              style={{ height: 'fit-content', width: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src="/titleContent.png" alt="제목/내용" style={{ height: '140px', width: '160px'}}/>
            </div>
          </MenuItem>
          <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '30px' }}>
            <div className="TextNode inline-block rounded bg-purple-700 my-2 px-2 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
              onDragStart={(event) => onDragStartDefault(event, 'TaskNameNode')}
              draggable 
              style={{ height: 'fit-content', width: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src="/jobManager.png" alt="업무/담당자"/>
            </div>
          </MenuItem>
          <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px', paddingRight: '30px'}}>
            <div className="TextNode inline-block rounded bg-purple-700 my-2 px-2 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
              onDragStart={(event) => onDragStartDefault(event, 'TextNode3')}
              draggable 
              style={{ height: 'fit-content', width: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src="/titleDateContent.png" alt="제목/날짜/내용" style={{ height: '180px', width: '160px'}}/>
            </div>
          </MenuItem>
        </div>
        <Divider variant="middle" sx={{ padding:'8px', borderColor: 'purple' }} />
        <div className="text-2xl ml-5 mt-2 text-violet-900 p-1 rounded-lg font-bold">
          Memo</div>
        <div className='flex ml-1'>  
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-yellow-300 my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNode')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>노랑</div> */}
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded my-2 bg-teal-400 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNodeB')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>파랑</div> */}
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-green-400 my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNodeG')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>초록</div> */}
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-pink-400 my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNodeP')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>분홍</div> */}
          </div>
        </MenuItem>
        <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="TextNode inline-block rounded bg-purple-400 my-2 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]" 
            onDragStart={(event) => onDragStartDefault(event, 'MemoNodeV')}
            draggable 
            style={{ height: '50px', width: '50px' }}>
            {/* <div>보라</div> */}
          </div>
        </MenuItem>

        </div>
        {/* <Divider variant="middle" sx={{ padding:'8px', borderColor: 'white' }} /> */}


      </MenuList>
      </Paper>
    </div>
  )
}

export default NodeBox
