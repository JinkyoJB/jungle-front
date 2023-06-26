import React, { useEffect } from 'react';
import { useQuery } from 'react-query';

//서버요청용
import { request } from "../../utils/axios-utils"

//css용
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi';
import { HiChevronRight } from 'react-icons/hi'; 
import { HiUserCircle } from 'react-icons/hi';


//서버용 코드
const fetchProject = () => {
  return request({ url: 'project'})
}

// const fetchMembers = () => {
//   return request({ url: 'api/members'})
// }

const Sidebar = () => {
    // useQuery를 사용하여 fetchLikePhoto 함수를 호출하고, 그 결과를 콘솔에 출력
    const { data : projectData} = useQuery('projectList', fetchProject,{
        // onSuccess: (data) => {console.log('sidebar get success', data)},
        // retry:5,
        // retryDelay:500
    });

    // const { data : membersData } = useQuery('membersData', fetchMembers,{
    //     // onSuccess: (data) => {console.log('sidebar get success', data)},
    //     // retry:5,
    //     // retryDelay:500
    // });

    
    {/* 🐼 즐겨찾기 해놓은 프로젝트 3개까지 표시 */}
    const likedProjects = projectData?.data?.filter(project => project.like).slice(0, 3);

    {/* 🐼 날짜 빠른 순으로 3개 표시 */}
    const recentProjects = projectData?.data?.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 3);



    return (
        <div
            id="sidenavL"
            className="fixed left-0 w-60 h-screen -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-position="absolute">

            <div className="p-4">
                {/* 🐼즐겨찾기 해놓은 프로젝트 리스트*/}
                <div className="text-lg mb-4 my-2 text-center bg-violet-100 p-1 rounded-lg ">
                    즐겨찾는 프로젝트</div>
                <div>
                    
                    {
                        likedProjects?.map((project) => (
                        <div key={project._id}>
                            <Link to={`project/${project._id}`}>
                                <div className="flex items-center">
                                    <HiStar size={24} color="gold" className="mr-1" />
                                    <div className="flex flex-col">
                                        <p className="my-1 text-white">{project.name}</p>
                                        <p className='ml-4 text-sm text-gray-500'>{new Date(project.time).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        ))
                    }
                </div>
                <div className='mx-4 my-4'><Divider /></div>
            
                {/* 🐼 최신 프로젝트 리스트*/}
                <div className="text-lg mb-4 my-2 text-center bg-violet-100 p-1 rounded-lg">
                    최신 프로젝트</div>
                {
                    recentProjects?.map((project) => (
                        <div key={project._id} >
                            <Link to={`project/${project._id}`}>
                                <div className="flex items-center">
                                    <HiChevronRight size={24} color="violet" />
                                    <div className="flex flex-col">
                                        <p className="my-1 text-white">{project.name}</p>
                                        <p className='ml-4 text-sm text-gray-500'>{new Date(project.time).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }

            <div className='mx-4 my-4'><Divider /></div>
            
            {/* 🐼  접속 멤버 목록 리스트 : demo*/}
            {/* <div className="text-lg mb-4 my-2 text-center bg-violet-100 p-1 rounded-lg">
                멤버 목록</div>
                <div className="p-4">
                    <ul>
                        {membersData?.data?.map((member, index) => {
                            const memberId = Object.keys(member)[0];
                            const memberName = member[memberId];
                            return (
                                <li key={index} className="flex items-center mb-2">
                                    <HiUserCircle size={24} className="mr-2" color="gray"/>
                                    <span>{memberName}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div> */}

            </div>
        </div>
    );
};


export default Sidebar;
