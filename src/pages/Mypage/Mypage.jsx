import * as React from 'react';

//components
import Header from "../../components/mypage/Header"
import Sidebar from "../../components/mypage/Sidebar"
import GalleryArea from '../../components/mypage/GalleryArea';
import ImgFileInput from '../../components/mypage/ImgFileInput'

function Mypage() {
  return (
    <div className="Mypage">
      <ImgFileInput/>
      <GalleryArea />
      <Sidebar />
      <Header />
    </div>
  );
}

export default Mypage;