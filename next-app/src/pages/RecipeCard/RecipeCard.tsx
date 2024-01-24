import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from "framer-motion"

interface RecipeCardProps {
    host: string;
    recipe: {
        Id: number;
        Name: string;
        Description: string;
        Ingredients: string;
        Directions: string;
    };
    recipeUpdates: number;
    setRecipeUpdates: (n: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ host, recipe, recipeUpdates, setRecipeUpdates }) => {
    const [isShown, setIsShown] = useState(true);

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
        console.log("Deleting recipe with id: " + recipe.Id);
        await deleteRecipe(recipe.Id)
            .catch(err => console.error(err))
    }

    const DeleteRecipeModal = () => {
        return (
            <div className="modal fade" id={"deleteRecipeModal" + recipe.Id} tabIndex={-1} aria-labelledby="deleteRecipeModalLabel" aria-hidden="true">
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
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <AnimatePresence>
            {isShown && <motion.div
                initial={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.25 }}
                onAnimationComplete={()=>{
                    handleDeleteRecipe()
                }}
            >
                <div className="container-fluid mb-4" id={"recipe-card-" + recipe.Id}>
                    <div className="card bg-light">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h4 className="my-0">{recipe.Name}</h4>
                            <div className="ml-auto">
                                <button type="button" className="btn btn-lg" onClick={()=>{setIsShown(false)}}>
                                    <FontAwesomeIcon icon={faPenToSquare as IconProp} />
                                </button>
                                <button type="button" className="btn btn-lg" data-bs-toggle="modal" data-bs-target={"#deleteRecipeModal" + recipe.Id}>
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
                                        <IngredientCheckbox key={index} ingredient={ingredient} index={index} />
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
                    <DeleteRecipeModal />
                </div>
            </motion.div>}
        </AnimatePresence>
    );
};

export default RecipeCard;
