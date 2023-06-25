import React, {useEffect} from "react";
import Header from '../../components/mypage/Header';
import { useParams } from "react-router-dom";
// import Editingbox2 from "../../components/Editor/Editingbox2";
import YjsDoc from "../../components/Editor/Ydoc";

function Editor2() {
    const {projectId} = useParams();
    useEffect(()=> {
        console.log(projectId);
    }, [projectId]);

    return (
        <div className="edit">
            <Header />
            <YjsDoc projectId={projectId} />
        </div>
    )
}

export default Editor2;