import React, { useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { request } from "../../utils/axios-utils"
import './../../index.css'
import './QuillEditor.css'
import { saveAs } from 'file-saver';

Quill.register('modules/ImageResize', ImageResize);

const modules = {
	toolbar: [
        [{ 'font': ['sans-serif', 'arial', 'IBM Plex Sans KR', 'courier'] }],
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['link', 'image'],
		[{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
		['clean']
	],

  	/* 추가된 코드 */
	ImageResize: {
		parchment: Quill.import('parchment')
	}
};



const QuillEditor = () => {
    let { projectId } = useParams();
    console.log('project Id: ', projectId);
    const [value, setValue] = useState('');
    const editorRef = useRef(null);
    const [projectName, setProjectName] = useState(''); // added this line
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


    useEffect(() => {
        // Fetch the initial content from the server
        request({
            method: 'get',
            url: `/project/report/${projectId}`,
        })
        .then(res => {
            console.log(res.data);
            const title = res.data.title;
            const presenter = res.data.presenter;
            const content = res.data.content;
            // Structure the HTML based on the response
    
    
            let contentHtml = `
            <h1>${title}</h1>
            <br>
            <div style="display: flex; justify-content: flex-end;"><p>${presenter}</p></div>
            <p>이곳은 보고서 개요를 쓰는 곳입니다.</p>
            <br>
            <br>
            `
            // Loop through the content object
            for (let key in content) {
                // Append each key and its associated value to the HTML
                contentHtml += `
                    <h2>${key}</h2>
                    <p>${content[key]}</p>
                    <br>
                `;
            }
    
            // Add final part to contentHtml
            contentHtml += '<h3> [ 첨부사진 ] </h3>';
    
            setValue(contentHtml);
            // Now you can use contentHtml variable where you need it
            console.log(contentHtml);
        })
        .catch(err => {
        console.error(err);
        });
    }, []); // <-- This empty array ensures the useEffect only runs once on mount.
    

    useEffect(() => {
        // Fetch the project name
        request({
            method: 'get',
            url: `/project/name/${projectId}`,
        })
        .then(res => {
            setProjectName(res.data.name); // assuming the response has a "name" field
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    const exportAsPDF = () => {
        const editor = document.querySelector('.ql-editor');
        html2canvas(editor, {scale : 2}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            console.log(imgData)

            const pdfWidth = 190;
            const pageHeight = pdfWidth * 1.414;
            const pdfHeight = canvas.height * pdfWidth / canvas.width;
            const heightLeft = pdfHeight;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps= pdf.getImageProperties(imgData);
            // const pdfWidth = pdf.internal.pageSize.getWidth();
            // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'PNG', 10, 0, pdfWidth, pdfHeight);
            pdf.line(15, 8, 195, 8);
            pdf.line(15, 289, 195, 289);
            pdf.save("download.pdf");
        });
    };    

    return (
        <div>
        <h1 className='flex-auto text-center'> {projectName}  </h1>
        <button className="button" onClick={exportAsPDF}>
            PDF로 출력해보세요!
          </button>
        
          <button 
            onClick={handleDownload} 
            className="button mr-3 inline-block mb-2 bg-purple-700 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white">
                프로젝트 사진 다운로드 (ZIP)
        </button> 
        <ReactQuill 
            theme="snow" 
            className='h-screen'
            value={value} 
            onChange={setValue}
            modules={modules}
            ref={editorRef}
        />
        
        </div>
    );
};

export default QuillEditor;