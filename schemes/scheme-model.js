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

module.exports = {
  find,
  findById,
  findSteps,
  add,
}
