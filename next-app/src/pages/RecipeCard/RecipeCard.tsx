import React, { useState } from "react";

interface RecipeCardProps {
    recipe: {
        Id: number;
        Name: string;
        Description: string;
        Ingredients: string;
        Directions: string;
    };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    const ingredientsArray: string[] = recipe.Ingredients.split(",");
    const directionsArray: string[] = recipe.Directions.split(/\d+\.\s/).filter(step => step.trim() !== "");

    const IngredientCheckbox = ({ ingredient, index }) => {
        const [checked, setChecked] = useState(false);
        const textClass = checked ? "form-check-label text-decoration-line-through" : "form-check-label";
        const toggleCheck = () => setChecked(!checked);
        return (
            <li key={index} className="list-group-item" onClick={toggleCheck}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" onChange={toggleCheck} checked={checked} />
                    <label className={textClass}>
                        {ingredient}
                    </label>
                </div>
            </li>
        )
    }

    return (
        <div className="container w-75 mb-4">
            <div className="card bg-light">
                <div className="card-header pt-3 d-flex justify-content-between">
                    <h5>{recipe.Name}</h5>
                    <div className="ml-auto">X</div>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {recipe.Description}.
                    </p>
                    <div className="mb-3">
                        <h6>Ingredients:</h6>
                        <ul className="list-group">
                            {ingredientsArray.map((ingredient, index) => (
                                <IngredientCheckbox ingredient={ingredient} index={index}/>
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
