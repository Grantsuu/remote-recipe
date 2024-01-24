import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import RecipeCard from '@pages/RecipeCard/RecipeCard'

// Gets the host name from the context in order to fetch the data from the correct host
export const getServerSideProps = (context) => {
    const host = context.req.headers.host?.split(':')[0] || 'localhost'
    return {
        props: { host }
    }
}

export interface Handlers {
    handleDeleteRecipe: (id: number) => void;
}

const Home = ({ host }) => {
    const [recipes, setRecipes] = useState([])
    const [recipeUpdates, setRecipeUpdates] = useState(0)

    useEffect(()=> {
        getRecipes()
        .then(data => setRecipes(data))
        .catch(err => console.error(err))
    },[recipeUpdates])

    async function getRecipes() {
        const res = await fetch('http://' + host + ':8080/api/recipes')

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch recipes')
        }

        return res.json()
    }

    async function deleteRecipe(id) {
        const res = await fetch('http://' + host + ':8080/api/recipes/' + id, {
            method: 'DELETE'
        })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to delete recipe')
        }

        return res.json()
    }

    const handleDeleteRecipe = async (id: number) => {
        await deleteRecipe(id)
            .catch(err => console.error(err))
    }

    return (
        <div className={styles.container}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
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
                    <div className="container-fluid d-flex justify-content-center">
                        <button className="btn btn-success mb-3">Add new recipe</button>
                    </div>
                    <div className="container-fluid w-75 p-0">
                        {recipes.map((recipe, index) => (
                            <RecipeCard key={index} recipe={recipe} handlers={{handleDeleteRecipe: handleDeleteRecipe}} />
                        ))}
                    </div>
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