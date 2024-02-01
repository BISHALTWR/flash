"use client"
import  React, {useState} from 'react';
import Navbar from '../components/navbar/page';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';
import {Button} from '@nextui-org/react';


const Page = () => {
    const [output, setOutput] = React.useState("");
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((value) => {
        console.log('value:', value);
        setValue(value);
    }, []);
    const Run = React.useCallback(async (value)=>{
        // setOutput(JSON.stringify(value));
        try{
            const response = await fetch('http://localhost:4000/executeJS/',{
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    "username": "test",
                    "code": value
                })
              });
              const data = await response.json();
              if(response.status == 200){
                setOutput(data.output);
              } else if(response.status == 500) {
                setOutput(data.err)
              }
            } catch(err) {
                console.log(err);
                setOutput(err)
            }
    });
    const Save = React.useCallback(async (value)=>{
        try{
            const response = await fetch('http://localhost:4000/saveCode/',{
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    "id": "tryID",
                    "code": value
                })
            });
            console.log(response);
        } catch(err) {
            console.log(err);
        }
    })
    return(
        <>
            <Navbar/>
            <div height="90vh" className='flex w-full mt-10'>
                <div className = 'box-border content-center w-2/5 float-left ml-10 rounded bg-neutral-300'>
                    <CodeMirror value={value} height="80vh" extensions={[javascript({ jsx: true })]} onChange={onChange} theme={okaidia}/>
                    <div className = 'content-center'>
                        <Button onClick={() => Run(value)} className="content-center bg-emerald-500">Run</Button>
                        <Button onClick={() => Save(value)} className="content-center bg-emerald-500">Save</Button>
                    </div>
                </div>
                <div  className='h-[80vh] box-border w-2/5 float-right mr-10 ml-10 pl-5 pr-5 pt-1 pb-1 rounded bg-neutral-300 overflow-y-scroll'>
                    {/* {output} */}
                    {
                        output.split('\n').map((value,index)=>{
                            return <p>{value}</p>
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default Page; // This allows you to import and use this component in other files