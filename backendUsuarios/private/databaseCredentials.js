var dbInfo = {
  dbName: 'ayd2db',
  ipDb: '3.140.186.177:27017',
  dbUser: 'uayd21s',
  dbPassword: '1ps9sayd2lb'
}

module.exports = `mongodb://${dbInfo.dbUser}:${dbInfo.dbPassword}@${dbInfo.ipDb}/${dbInfo.dbName}`;