
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Company.findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {
    // validate
    if (await db.Company.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    const company = new db.Company(params);
    
    // hash password
    company.passwordHash = await bcrypt.hash(params.password, 10);

    // save company
    await company.save();
}

async function update(id, params) {
    const company = await getUser(id);

    // validate
    const emailChanged = params.email && company.email !== params.email;
    if (emailChanged && await db.Company.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to company and save
    Object.assign(company, params);
    await company.save();
}

async function _delete(id) {
    const company = await getUser(id);
    await company.destroy();
}

// helper functions

async function getUser(id) {
    const company = await db.Company.findByPk(id);
    if (!company) throw 'Company not found';
    return company;
}
