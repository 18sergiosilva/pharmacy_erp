let User = {
    user: 'uayd21s',
    pwd: '1ps9sayd2lb',
    roles: [
        {
            role: 'dbOwner',
            db: 'ayd2db'
        }
    ]
};
let Dbname='ayd2db';
let Collections=['products'];
let Rootuser = {Username:'root', Pwd:'1ps9sayd2lb'}

db.auth(Rootuser.Username, Rootuser.Pwd);
db = db.getSiblingDB(Dbname);
db.createUser(User);
Collections.forEach(Collection=>{
    db.createCollection(Collection);
});