
const db = require('_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Type.findAll();
}

async function getById(id) {
    return await getType(id);
}

async function create(params) {
    // validate
    if (await db.Type.findOne({ where: { description: params.description } })) {
        throw 'type "' + params.description + '" is already registered';
    }

    const type = new db.Type(params);
    
    

    // save user
    await type.save();
}

async function update(id, params) {
    const type = await getType(id);

    // validate
    const typeChanged = params.description && user.description !== params.description;
    if (typeChanged && await db.Type.findOne({ where: { description: params.description } })) {
        throw 'Type "' + params.description + '" is already registered';
    }

    

    // copy params to user and save
    Object.assign(type, params);
    await type.save();
}

async function _delete(id) {
    const type = await getType(id);
    await type.destroy();
}

// helper functions

async function getType(id) {
    const type = await db.Type.findByPk(id);
    if (!type) throw 'type not found';
    return type;
}
