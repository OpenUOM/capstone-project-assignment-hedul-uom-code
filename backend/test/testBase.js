async function resetDatabase(_db) {
  await _db.migrate.latest();
  await _db.seed.run();
}

module.exports = {
  resetDatabase
};
