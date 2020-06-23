const db = require('../data/config')

function find() {
  return db("schemes").select('*')
}

function findById(id) {
  return db("schemes").first('*').where({id})
}

function findSteps(id) {
  return db("steps as st").select('st.id','st.step_number','st.instructions','sc.scheme_name')
    .join('schemes as sc','sc.id','st.scheme_id').where('st.scheme_id', id).orderBy('step_number')
}

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme)
  return findById(id)
}

async function update(changes, id) {
  await db("schemes").where({ id }).update(changes)
  return findById(id)
}

async function remove(id) {
  const scheme = await findById(id)
  await db("schemes").where({id}).del()
  return scheme
}

async function addStep(step, scheme_id) {
  step.scheme_id = scheme_id
  const [id] = await db("steps").insert(step)
  return db("steps as st").first('st.id','st.step_number','st.instructions','sc.scheme_name')
    .join('schemes as sc','sc.id','st.scheme_id').where('st.id',id)
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep,
}
