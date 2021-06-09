const secrets = {
  dbUri: process.env.DB_URI || 'mongodb://localhost:27017/',
  salt: process.env.SALT || '|]J~y _mj]TmB>k]:{ER5?uT:BVLWn1Ri_R}+.GI|h-f*mYIZewWGqLaByOigq;}',
};

const getSecret = (key) => secrets[key];

module.exports = { getSecret };
