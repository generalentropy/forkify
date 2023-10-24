import View from './view.js';

import icons from '../../img/icons.svg';
import { number2fraction } from 'number2fraction';

// import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      // console.log(btn);
      // console.log(btn.dataset);
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerAddBookmark(handler) {
    // Event delegation
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;

      handler();
    });
  }

  // Private method
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings - 1
        }">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.servings + 1
        }">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
  </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
   

      
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;
  }

  _generateMarkupIngredient(ing) {
    return `
  <li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ing.quantity ? number2fraction(ing.quantity).toString() : ''
  }</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
  </div>
</li>
  `;
  }
}

export default new RecipeView();

/*


When you use the `.map()` method on an array, you provide it with a function. This function is then automatically called for each element in the array. The element being processed is passed as the first argument to the function.

In this case, `this.#generateMarkupIngredient` is provided as the function to `.map()`. So, when `.map()` is processing the `ingredients` array, it automatically calls `this.#generateMarkupIngredient` for each ingredient in the array and passes the ingredient as the first argument.

This is why you see `#generateMarkupIngredient(ing)` having the `ing` parameter. It represents each ingredient object from the `this.#data.ingredients` array as `.map()` processes the array.

In other words, when you write:

```javascript
this.#data.ingredients.map(this.#generateMarkupIngredient)
```

What's happening under the hood is something similar to:

```javascript
let result = [];
for (let i = 0; i < this.#data.ingredients.length; i++) {
  let ing = this.#data.ingredients[i];
  result.push(this.#generateMarkupIngredient(ing));
}
```

The `.map()` method is essentially a more concise and functional way to achieve the same result.

It's also worth noting that when using instance methods (like `#generateMarkupIngredient`) inside other methods or callbacks (like `.map()`) in a class, the context (`this`) might not always point to the instance of the class. In this particular code, it works because of how the method is defined and used. If there were issues with context, you'd typically see developers binding the method to the instance, like:

```javascript
this.#data.ingredients.map(this.#generateMarkupIngredient.bind(this))
```

But in this case, it's not necessary. The method works as expected without any binding.






*/
