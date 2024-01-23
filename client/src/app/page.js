"use client"
import  React, {useState} from 'react';
import Navbar from '../components/navbar/page';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

const Page = () => {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val, viewUpdate) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return ( // Every html (jsx) component lies inside this (component shown in page)
        <>
            <Navbar/>
            <section className="text-gray-600 body-font">
                <div className='m-10'>
                    <CodeMirror value={value} height="80vh" extensions={[javascript({ jsx: true })]} onChange={onChange} theme={okaidia}/>
                </div>
                </section>
        </>
    )
}

export default Page; // This allows you to import and use this component in other files