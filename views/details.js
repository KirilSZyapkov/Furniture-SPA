import { html } from '../node_modules/lit-html/lit-html.js';
import { getItemById, deleteItem } from '../src/data.js';


const detailsTemplate = (item, deletFurniture) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src=${item.img} />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${item.make}</span></p>
        <p>Model: <span>${item.model}</span></p>
        <p>Year: <span>${item.year}</span></p>
        <p>Description: <span>${item.description}</span></p>
        <p>Price: <span>${item.price}</span></p>
        <p>Material: <span>${item.material}</span></p>
        <div>
            <a href=${`/edit/${item._id}`} class="btn btn-info" name="button">Edit</a>
            <a @click=${deletFurniture} href="javascript:void(0)" class="btn btn-red" name="button">Delete</a>
        </div>
    </div>
</div>`;

export async function details(ctx) {
    const id = ctx.params.id;
    const item = await getItemById(id);

    ctx.render(detailsTemplate(item, deletFurniture));

    async function deletFurniture() {
        await deleteItem(item._id);
        ctx.page.redirect('/');
    }

    const userId = sessionStorage.getItem('userID');
    if (userId === item._ownerId) {
        document.querySelectorAll('[name = "button"]').forEach(b => b.style.display = 'inline-block');
    } else {
        document.querySelectorAll('[name = "button"]').forEach(b => b.style.display = 'none');
    }
}
