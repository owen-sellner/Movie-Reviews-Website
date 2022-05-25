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




  return (
    <div>
      <h1>
        Recipe Finder
      </h1>

      <Search />

      <hr />

      <List list={recipes} />

    </div>
  );
}

function Search() {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  )
}

function List(props) {
  return (
    <ul>
      {props.list.map((item) => {
        return (
          <Item item={item} />
        );
      })}
    </ul>
  )
}

function Item(props) {
  return (
    <li>
      <li>{props.item.title}</li>
      <ul>
        <li>Difficulty: {props.item.difficulty}</li>
        <li>Ingredients:
          <ul>
            {props.item.ingredients.map((thing) => {
              return (
                <li>{thing}</li>
              );
            })}
          </ul>
        </li>
        <li>Calories: {props.item.calories}</li>
        <li>Instructions: {props.item.instructions}</li>
      </ul>
    </li>
  );
}


export default App;