import React from "react";

interface RecipeCardProps {
    recipe: {
        Name: string;
        Description: string;
        Ingredients: string;
        Directions: string;
    };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const ingredientsArray: string[] = recipe.Ingredients.split(",");
    const directionsArray: string[] = recipe.Directions.split(/\d+\.\s/).filter(step => step.trim() !== "");
    return (
        <div className="container w-75 mb-4">
            <div className="card bg-light">
            <div className="card-header pt-3"><h5>{recipe.Name}</h5></div>
                <div className="card-body">
                    <p className="card-text">
                        {recipe.Description}.
                    </p>
                    <div className="mb-3">
                        <h6>Ingredients:</h6>
                        <ul className="list-group">
                            {ingredientsArray.map((ingredient, index) => (
                                <li key={index} className="list-group-item">
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h6>Directions:</h6>
                        <ol className="list-group list-group-numbered">
                            {directionsArray.map((step, index) => (
                                <li key={index} className="list-group-item">
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
