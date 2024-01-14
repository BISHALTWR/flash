"use client"
import  React from 'react'; // Required to use JSX syntax and create react components
import Link from 'next/link'

const Page = () => {
    return ( // Every html (jsx) component lies inside this (component shown in page)
        <div>
            <h1>Hello, World! Welcome home.</h1>
            <Link href='./register'>Login</Link>
        </div>
    )
}

export default Page; // This allows you to import and use this component in other files