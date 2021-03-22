import { html } from '../node_modules/lit-html/lit-html.js';
import { updateFurniture, getItemById } from '../src/data.js'

const editFurnitureTemplate = (onSubmit, furniture, inValidMake, inValidModel, inValidYear, inValiddesc, inValidPrice, inValidImg) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${inValidMake ? "form-control is-invalid" : 'form-control is-valid'} id="new-make" type="text" name="make" .value=${furniture.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${inValidModel ? "form-control is-invalid" : 'form-control is-valid'} id="new-model" type="text" name="model" .value=${furniture.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${inValidYear ? "form-control is-invalid" : 'form-control is-valid'} id="new-year" type="number" name="year" .value=${furniture.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${inValiddesc ? "form-control is-invalid" : 'form-control is-valid'} id="new-description" type="text" name="description"
                    .value=${furniture.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${inValidPrice ? "form-control is-invalid" : 'form-control is-valid'} id="new-price" type="number" name="price" .value=${furniture.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${inValidImg ? "form-control is-invalid" : 'form-control is-valid'} id="new-image" type="text" name="img" .value=${furniture.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${furniture.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

export async function edit(ctx) {
    const id = ctx.params.id;
    const furniture = await getItemById(id);
    ctx.render(editFurnitureTemplate(onSubmit, furniture));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const make = formData.get('make');
        const model = formData.get('model');
        const year = Number(formData.get('year'));
        const description = formData.get('description');
        const price = Number(formData.get('price'));
        const image = formData.get('img');
        const material = formData.get('material');
        const body = { make, model, year, description, price, image, material };
        
        let inValidMake = false;
        let inValidModel = false;
        let inValidYear = false;
        let inValiddesc = false;
        let inValidPrice = false;
        let inValidImg = false;

        if (make === '' || make.length < 4) {
            inValidMake = true;
        }
        if (model === '' || model.length < 4) {
            inValidModel = true;
        }
        if (year === '' || (year < 1950 || year > 2050)) {
            inValidYear = true;
        }
        if (description === '' || description.length < 10) {
            inValiddesc = true;
        }
        if (price === '' || price < 0) {
            inValidPrice = true;
        }
        if (image === '') {
            inValidImg = true;
        }
        
        if (inValidMake === false && inValidModel === false && inValidYear === false && inValiddesc === false && inValidPrice === false && inValidImg === false) {
            await updateFurniture(furniture._id, body);
            ctx.page.redirect('/details/' + furniture._id);
           
        } else {
            ctx.render(editFurnitureTemplate(onSubmit,furniture, inValidMake, inValidModel, inValidYear, inValiddesc, inValidPrice, inValidImg))
        }
    }
}