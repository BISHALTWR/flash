"use client"
import  React, {useState, useEffect} from 'react';
import Navbar from '../components/navbar/page';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import {Button,Input} from '@nextui-org/react';
import { useSelector, useDispatch } from "react-redux"; // For userdetails
import { useSearchParams } from 'next/navigation';
import {Run, Save} from '../components/codeFuntions/page';
import Split from 'react-split'
import { VscRunAll } from "react-icons/vsc";
import { AiOutlineSave } from "react-icons/ai";

const Page = () => {
    const {isLoggedIn, userDetails} = useSelector(state => state.user); // User details
    const user_id=userDetails._id;
    const [output, setOutput] = React.useState("");
    const [value, setValue] = React.useState("");
    const [file_name, setFileName] = useState("");
    const params = useSearchParams();
    const receivedFileName = params.get("filename")
    
    useEffect(() => {
        if (receivedFileName) {
            setFileName(receivedFileName);
            console.log(receivedFileName);
        }
    }, [receivedFileName]);

    const onChange = (value) => {
        console.log('value:', value);
        setValue(value);
    };
                
    return (
        <div className='w-[100vw] h-[100vh]'>
            <Navbar file_name={file_name?file_name:"Untitled"}/>
            <div style={{alignSelf:"center"}} className='ml-[5vw] w-[fit-content] mt-[5px] mb-[5px]'>
                <Button onClick={async () => {
                    const result = await Run(value)
                    setOutput(result);
                    }}
                    className="content-center bg-sky-500"
                ><VscRunAll /></Button>
                <Button onClick={() => Save(value,file_name,user_id)} className="content-center bg-emerald-500 ml-4 mr-4"><AiOutlineSave /></Button>
            </div>
            <Split className="split max-w-[90vw] ml-auto mr-auto outline-1 rounded-[20px] overflow-hidden" minSize={250} >
                <div style={{display:'flex',flexDirection:"column", gap:"5px"}}>
                    <div className="rounded-[20px] overflow-hidden">
                        <CodeMirror value={value} height="80vh" extensions={[javascript({ jsx: true })]} onChange={onChange} t/>
                    </div>
                </div>
                <div style={{height:"80vh"}} className='p-[10px] bg-white rounded-[20px]'>
                    {
                        output.split('\n').map((value,index)=>{
                            return <p>{value}</p>
                        })
                    }
                </div>
            </Split>
        </div>
    )
}

export default Page; // This allows you to import and use this component in other files