import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';
import * as crud from './data.js';

import { homePage } from '../views/homePage.js';
import { create } from '../views/create.js';
import { details } from '../views/details.js';
import { edit } from '../views/edit.js';
import { logIn } from '../views/login.js';
import { myFurniture } from '../views/myFurniture.js';
import { register } from '../views/register.js';

const container = document.querySelector('.container');

page('/', decorateContext, homePage);
page('/dahsboard', decorateContext, homePage);
page('/create', decorateContext, create);
page('/details/:id', decorateContext, details);
page('/edit/:id', decorateContext, edit);
page('/login', decorateContext, logIn);
page('/my-furniture', decorateContext, myFurniture);
page('/register', decorateContext, register);

page.start();

async function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);
    next();
}

crud.setUserNav();