import * as React from 'react';

const App = () => {

  const recipes = [
    {
      title: 'Fruit salad',
      difficulty: '2',
      ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
      calories: "200",
      instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl."
    }, {
      title: 'Avocado wrap',
      difficulty: '3',
      ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
      calories: "400",
      instructions: "Wash all fruits and vegetables. Slice avocadoes and apples. Mix all ingredients and wrap them in a tortilla bread."
    },
  ];

  // Creates the variable and constructor for the search term
  const [ingredientSearchTerm, setIngredientSearchTerm] = React.useState('');
  const [difficultyLevel, setDifficultyLevel] = React.useState('');


  // Sets the new search term
  const handleIngredientSearch = (event) => {
    setIngredientSearchTerm(event.target.value);
  };
  const handleDifficultySearch = (event) => {
    setDifficultyLevel(event.target.value);
  };

  const foundRecipesByIngredients = recipes.filter(function (recipe) {
    // Checks if the search term is empty
    if (ingredientSearchTerm) {
      return recipe.ingredients.includes(ingredientSearchTerm);
    } else {
      return recipe;
    }
  });

  const foundRecipesByDifficulty = foundRecipesByIngredients.filter(function (recipe) {
    // Checks if the search term is empty
    if (difficultyLevel) {
      return recipe.difficulty <= difficultyLevel;
    } else {
      return recipe;
    }
  });

  return (
    <div>
      <h1>
        Recipe Finder
      </h1>

      <p>
        <Search 
          label={"Search for ingredients: "}
          onSearch={handleIngredientSearch} 
        />
      </p>
      <p>
        <Search 
          label={"Search by max difficulty level: "}
          onSearch={handleDifficultySearch} 
        />
      </p>

      <hr />

      <p>
        Contains Ingredient: <strong>{ingredientSearchTerm}</strong>
      </p>
      <p>
        Max Difficulty: <strong>{difficultyLevel}</strong>
      </p>

      <List list={foundRecipesByDifficulty}/>

    </div>
  );
}


const Search = (props) => {
  return (
    <div>
      {/* Creates the label for the search bar and the search bar itself */}
      <label htmlFor="search">{props.label}</label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  ) 
}

const List = (props) => {
  return (
    <div>
      <ul>
        {props.list.map((item) => {
          return (
            <Item item={item}/>
          )
        })}
      </ul>
    </div>
  )
}

const Item = (props) => {
  return (
    <div>
      <li>
        <p>{"Title: " + props.item.title}</p>
        <p>{"Difficulty: " + props.item.difficulty}</p>
        <p>Ingredients: </p>
          <ul>
            {props.item.ingredients.map((ingredient) => (<li>{ingredient}</li>))}
          </ul>
        <p>{"Instructions: " + props.item.instructions}</p>
        <p>{"Calories: " + props.item.calories}</p>
      </li>
    </div>
  )
}

export default App;