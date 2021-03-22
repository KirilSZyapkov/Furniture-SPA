import { html } from '../node_modules/lit-html/lit-html.js';
import { login } from '../src/data.js';
import { homePage } from '../views/homePage.js';

const loginTemplate = (onSubmit, isField) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>${!isField ? 'Please fill all fields.' : 'All fields are required!'}</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${!isField ? "form-control" : 'error' } id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${!isField ? "form-control" : 'error' } id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;

export async function logIn(ctx) {

    ctx.render(loginTemplate(onSubmit));

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email === '' || password === '') {
            const isField = true;
            ctx.render(loginTemplate(onSubmit, isField))
            return
        }
        login(email, password);
        event.target.reset();
        ctx.page.redirect('/');
    }
}