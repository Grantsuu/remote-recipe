import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import RecipeCard from '@pages/RecipeCard/RecipeCard'

const Home = () => {

    const [recipes, setRecipes] = useState([])

    async function getData() {
        const res = await fetch('http://localhost:8080/api/recipes')
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
    
        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }
    
        return res.json()
    }

    useEffect(() => {
        getData()
            .then(data => setRecipes(data))
            .catch(err => console.error(err))
    }, [])
    return (
        <div className={styles.container}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Create Next app</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            {/* Main container */}
            <div className="container">
                {/* Title */}
                <div className="text-center">
                    <h1 className="display-3">
                        Project Remote-Recipes
                    </h1>
                    <p>
                        A simple <i>Next.js</i> app to display recipes, hosted on a remote virtual machine.
                    </p>
                </div>
                {/* Recipe Content */}
                <div className="container-fluid">
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a>
            </footer>
        </div>
    )
}

export default Home