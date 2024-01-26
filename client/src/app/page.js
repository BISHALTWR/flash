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
    const onRun = React.useCallback(async (value)=>{
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
    return(
        <>
            <Navbar/>
            {/* <section classNameName="text-gray-600 body-font relative">

                <div classNameName='container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap outline'>
                    <CodeMirror value={value} extensions={[javascript({ jsx: true })]} onChange={onChange} theme={okaidia}/>
                    <Button onClick={() => onRun(value)}>Run</Button>
                </div>

                <div id="Output" classNameName='lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 outline'>
                    {output}
                </div>
            </section> */}

            <div className='flex w-full mt-10'>
                <div className = 'box-border content-center w-2/5 float-left ml-10 rounded bg-neutral-300'>
                    <CodeMirror value={value} height="80vh" extensions={[javascript({ jsx: true })]} onChange={onChange} theme={okaidia}/>
                    <div className = 'content-center'>
                        <Button onClick={() => onRun(value)} className="content-center bg-emerald-500">Run</Button>
                    </div>
                </div>
                <div className='box-border w-2/5 float-right mr-10 ml-10 pl-5 pr-5 pt-1 pb-1 rounded bg-neutral-300'>
                    {output}
                </div>
            </div>

        </>
    )
}

export default Page; // This allows you to import and use this component in other files