import React, { useEffect } from 'react';
import './App.css';

const App = () => {
    const [recipes, setRecipes] = React.useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data.recipes));
    }, []);

    useEffect(()=> {
        console.log(recipes)
    }, [recipes])

    return (
        <div id="app">
            <h1>Recipes</h1>
            <div>
                {recipes.map((recipe: any) => (
                    <div key={recipe.id}>
                        <h2>{recipe.name}</h2>
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
