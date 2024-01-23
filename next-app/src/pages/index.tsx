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

const Home = ({ host }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        getRecipes()
            .then(data => setRecipes(data))
            .catch(err => console.error(err))
    }, [])

    useEffect(()=> {
        console.log(recipes)
    },[recipes])

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

    const handleDeleteRecipe = async () => {
        await deleteRecipe(20)
            .catch(err => console.error(err))
        await getRecipes()
            .then(data => setRecipes(data))
            .catch(err => console.error(err))
    }

    const DeleteRecipeModal = () => {
        return (
            <div className="modal fade" id="deleteRecipeModal" tabIndex={-1} aria-labelledby="deleteRecipeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title" id="deleteModalLabel">Delete Recipe</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Are you sure you want to delete this recipe?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteRecipe}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                            <RecipeCard host={host} key={index} recipe={recipe} />
                        ))}
                    </div>
                </div>
                <DeleteRecipeModal />
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