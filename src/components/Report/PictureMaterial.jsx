import React, { useState,  useEffect } from 'react'
import { render } from 'react-dom';
import { useParams } from 'react-router-dom';
import Gallery from "react-photo-gallery";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
import {photos} from './data'
import { request } from "../../utils/axios-utils"
import { saveAs } from 'file-saver';


const PictureMaterial = () => {
    let { projectId } = useParams();
    const [convertedPhotos, setConvertedPhotos] = useState([]);

    // 🧞‍♂️ 받는 용
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the initial content from the server
                const response = await request({
                    method: 'get',
                    url: `/project/images/${projectId}`,
                });
                console.log('urls: ', response.data.urls);
    
                const convertedData = response.data.urls.map(item => ({
                    src: item,
                    // width: Math.floor(Math.random() * 4) + 2, // random number between 2 and 5
                    // height: Math.floor(Math.random() * 4) + 2 // random number between 2 and 5
                    width: 2, // random number between 2 and 5
                    height: 2
                    // object cover -> width 갖춰주면 
                }));
                
                setConvertedPhotos(convertedData);
                console.log(convertedData);
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchData();
    }, [ projectId ]);

    
    const handleDownload = () => {
        request({
            url: `/project/zipimage/${projectId}`, // Replace with your zip file path
            method: 'GET',
            responseType: 'blob',
        })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'application/zip' });
                saveAs(blob, 'images.zip');
            })
            .catch((error) => console.error('There was an error!', error));
    };


    return (
        <div className='text-center' style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="fixed flex justify-center items-center my-2">
                <p className='text-white text-center font-bold pt-3'>이미지를 드래그해서 보고서에 넣어보세요!</p>
            </div>
            <div style={{maxHeight: '82vh', overflowY: 'auto', marginTop: '60px'}}>
                <Gallery photos={convertedPhotos}/> 
            </div>
        </div>

    );
};

export default PictureMaterial;
