import { html } from '../node_modules/lit-html/lit-html.js';
import { registerGuest } from '../src/data.js';
import { homePage } from '../views/homePage.js';

const registerTemplate = (onSubmit, isField) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
        <p id="pass" style='display: none'>Passwords don't match!</p>
        <p id="fields">${!isField ? 'Please fill all fields.' : 'All fields are required!'}</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${!isField  ? "form-control" : 'error' } id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${!isField ? "form-control" : 'error' } id="password" type="password"
                    name="password">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class=${!isField ? "form-control" : 'error' } id="rePass" type="password"
                    name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;

export async function register(ctx) {
    ctx.render(registerTemplate(onSubmit));

    function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');
        document.getElementById('pass').style.display = 'none';
        document.getElementById('fields').style.display = 'block';

        if (email === '' || password === '' || rePass === '') {
            const isField = true;
            const pass = true;
            ctx.render(registerTemplate(onSubmit, isField, pass));
            return;
        }

        if (password !== rePass) {
            document.getElementById('pass').style.display = 'block';
            document.getElementById('fields').style.display = 'none';
            return alert('Passwords do not match!');
        }
        registerGuest(email, password);
        homePage(ctx);
    }
}