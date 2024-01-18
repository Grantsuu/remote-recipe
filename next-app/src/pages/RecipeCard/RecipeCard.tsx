import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'

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
        <div className="container-fluid mb-4">
            <div className="card bg-light">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="my-0">{recipe.Name}</h4>
                    <div className="ml-auto">
                        <button type="button" className="btn btn-lg">
                            <FontAwesomeIcon icon={faPenToSquare as IconProp} />
                        </button>
                        <button type="button" className="btn btn-lg">
                            <FontAwesomeIcon icon={faXmark as IconProp} />
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {recipe.Description}.
                    </p>
                    <div className="mb-3">
                        <h6>Ingredients:</h6>
                        <ul className="list-group">
                            {ingredientsArray.map((ingredient, index) => (
                                <IngredientCheckbox key={index} ingredient={ingredient} index={index}/>
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
