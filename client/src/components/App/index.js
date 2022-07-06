/*
  Owen Sellner
  20915011

MSci 245 - Test 1

********* This test contains 4 questions, listed below. ***********

Q1. Turn products list into a stateful list. DONE

Q2. Create "inStock" stateful variable of type Boolean, and set it to true by default. DONE

Q3. Using ternary operator for conditional rendering, display only those products that are in stock. 
    Use "inStock" stateful variable to perform conditional rendering.

Q4. Complete the function "handleDiscountedProducts" that toggles between two modes: "Show discounted products only" 
    and "Show all products", in response to the user checking/unckecking the checkbox "DiscountCheckBox".

*/

import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';

const App = () => {

  const products = [
    {
      id: 1,
      title: 'Gala apple',
      category: 'fruit',
      price: 1.20,
      discount: true,
      discountAmount: "20%",
      inStock: true
    },
    {
      id: 2,
      title: 'Green pepper',
      category: 'vegetable',
      price: 2.30,
      discount: true,
      discountAmount: "10%",
      inStock: false
    },
    {
      id: 3,
      title: 'Whole-wheat tortilla',
      category: 'bread',
      price: 3.20,
      discount: false,
      discountAmount: "20%",
      inStock: true
    },
    {
      id: 4,
      title: 'Sesame bagel',
      category: 'bread',
      price: 1.05,
      discount: true,
      discountAmount: "10%",
      inStock: false
    },
    {
      id: 5,
      title: 'Fruit yoghurt',
      category: 'dairy',
      price: 4.30,
      discount: false,
      discountAmount: "10%",
      inStock: true
    },
    {
      id: 6,
      title: 'Cheddar cheese',
      category: 'dairy',
      price: 5.00,
      discount: true,
      discountAmount: "10%",
      inStock: true
    },
  ];

  // Q1 Stateful List
  const [productsList, setProductsList] = React.useState(products);

  // Q2 State Variable
  const [inStock, setInStock] = React.useState(true);

  // Q4 Filtered List of Discounted Products
  const [showDiscount, setShowDiscount] = React.useState(true);

  const discountedProducts = productsList.filter(function (product) {
    return product.discount;
  });

  const handleDiscountedProducts = (checked) => {
    if (checked) {
      setShowDiscount(false)
    } else {
      setShowDiscount(true)
    }
  }

  return (
    <Grid
      container
      spacing={1}
      style={{ maxWidth: '50%', margin: 20 }}
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Typography variant="h3" gutterBottom component="div">
        Online Grocery Store
      </Typography>

      <DiscountCheckBox
        onCheck={handleDiscountedProducts}
      />

      {showDiscount ?
        <List
          list={productsList}
          inStock={inStock}
        /> 
      :
        <List
          list={discountedProducts}
          inStock={inStock}
        />
    }

    </Grid>
  );
}


const DiscountCheckBox = ({ onCheck }) => {

  const handleChange = (event) => {
    onCheck(event.target.checked);
  };

  return (
    <div>
      Show discounted products only
      <Checkbox
        onChange={handleChange}
      />
      <hr />
    </div>
  );
}

const List = ({ list, inStock }) => {
  return (
    <>
      {list.map((item) => {
        return (
          <>
            {item.inStock == inStock &&
              <Item item={item} />             
            } 

          </>
        );
      })}
    </>

  )
}

const Item = ({ item }) => {


  return (
    <>
      <Grid item>
        <>
          <Typography variant="h6" gutterBottom component="div">
            {item.title}
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            {"Category: " + item.category}
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            {"Price: $" + item.price}
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            {"Discount: " + item.discount}
          </Typography>
          <Typography variant="body1" gutterBottom component="div">
            {"Discount Percentage: " + item.discountAmount}
          </Typography>
        </>
      </Grid>
    </>
  )
}


export default App;