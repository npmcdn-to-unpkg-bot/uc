'use strict';
import { readonly, decorate } from './lib/core-decorators/core-decorators';


class Meal {
  @readonly
  entree = 'steak';
}

const dinner = new Meal();
dinner.entree = 'salmon';
