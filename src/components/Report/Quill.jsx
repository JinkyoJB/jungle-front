import React, { useState, useRef, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { request } from "../../utils/axios-utils"
import './../../index.css'

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


const config = {
    styles: {
        header_1: {
            font: 'IBM Plex Sans KR', // default is 'Helvetica-Bold'
            fontSize: 18 // default is 16
        }
    }
};

const QuillEditor = () => {
    let { projectId } = useParams();
    console.log('project Id: ', projectId);
    const [value, setValue] = useState('');
    const editorRef = useRef(null);

    useEffect(() => {
        // Fetch the initial content from the server
        request({
            method: 'get',
            url: `/project/report/${projectId}`
        })
        .then(res => {
            console.log(res.data);
            // Structure the HTML based on the response
            const contentHtml = `
                 <h2>${res.data.title}</h2>
                 <p>${res.data.presenter}</p>
                <div>${res.data.content}</div>
            `;

            // Update the editor's content when the response is received
            setValue(contentHtml);
        })
        .catch(err => {
            console.error(err);
        });
}, []); // The empty array causes this useEffe

    const exportAsPDF = () => {
        const editor = document.querySelector('.ql-editor');
        html2canvas(editor, {scale : 2}).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps= pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("download.pdf");
        });
    };    

    return (
        <div>
        <h1 className='flex-auto text-center'> 여기가 보고서용 </h1>
        <button className="button" onClick={exportAsPDF}>
            Export as pdf
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