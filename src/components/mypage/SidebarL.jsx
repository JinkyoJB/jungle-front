import React from 'react';
import { useQuery } from 'react-query'

// //서버요청용
import { request } from "../../utils/axios-utils"

//css용
import { Divider } from '@mui/material';

//서버용 코드
const fetchLikePhodo = () => {
  return request({ url: ''})
}

const Sidebar = () => {
    // useQuery를 사용하여 fetchLikePhoto 함수를 호출하고, 그 결과를 콘솔에 출력
    // const { data: likePhodo, isLoading: likeLoading, isError: likeIsError, error: likeError, isFetching } = useQuery('likePhodo', fetchLikePhodo,{
        // onSuccess: (likePhodo) => {console.log('sidebar get success', likePhodo)},
        // retry:5,
        // retryDelay:500,
        // staleTime:1000*60,
        // cacheTime:1000*300,
        // refetchOnWindowFocus:true
    // });
    // const { data: lastPhodo, isLoading:lastLoad, isError:lastIsError, error:lastError } = useQuery('lastPhoto', fetchLastPhodo);

    // if (likeLoading || isFetching ){return <h2>Loading...</h2>}
    // if (likeLoading || isFetching ){return <h2>Loading...</h2>}

    // if (likeIsError ){return <h2>{likeError.message}</h2>}

    return (
        <div
            id="sidenavL"
            className=" fixed left-0 w-60 h-screen -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
            data-te-sidenav-init
            data-te-sidenav-hidden="false"
            data-te-sidenav-position="absolute">

            <div className="p-4">
                <div className=" text-lg mb-4">My image</div>
                    <div>
                        {/* {likePhodo?.data?.map(like => {
                            return (
                                <div key={like.id}>
                                    <h2>
                                        {like.id} : {like.name}
                                    </h2>
                                </div>
                            )
                        })} */}
                    </div>
            </div>
            <div className='mx-4'>
            <Divider />
            </div>
        <div className="p-4">
            <div className=" text-lg mb-4">Project List</div>
            </div>
            <div className='mx-4'>
                <Divider />
            </div>
            <div className="p-4">
                <div className="text-lg mb-4">My research</div>
        </div>
                
        </div>
    );
};

export default Sidebar;
