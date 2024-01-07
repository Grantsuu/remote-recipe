const RecipeCard = () => {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Recipe Title</h5>
          <p className="card-text">
            Recipe Description goes here. A brief overview of the
            deliciousness!
          </p>

          <div className="mb-3">
            <h6>Ingredients:</h6>
            <ul className="list-group">
              <li className="list-group-item">Ingredient 1</li>
              <li className="list-group-item">Ingredient 2</li>
              <li className="list-group-item">Ingredient 3</li>
              {/* Add more ingredients as needed */}
            </ul>
          </div>

          <div>
            <h6>Directions:</h6>
            <ol className="list-group">
              <li className="list-group-item">
                Step 1: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.
              </li>
              <li className="list-group-item">
                Step 2: Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </li>
              <li className="list-group-item">
                Step 3: Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris.
              </li>
              {/* Add more steps as needed */}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
