const bcrypt = require('bcrypt');

const password = 'abc123';

// console.log(bcrypt.genSaltSync(12));
const salt = '$2b$12$PW/wNnlKl7UMUWy9dZ5.2u';
// $2b$12$PW/wNnlKl7UMUWy9dZ5.2uIB4V.Ey6rBpuHofERULZdmR7sNKVZO2
// $2b$12$PW/wNnlKl7UMUWy9dZ5.2uIB4V.Ey6rBpuHofERULZdmR7sNKVZO2
// $2b$12$PW/wNnlKl7UMUWy9dZ5.2u

const hashed = bcrypt.hashSync(password, salt);

// console.log(hashed);

// $2b$12$g.QA1/iNRkJv05spVxIu4.JrUk0DuDog5BP.31ylO45Ib5wruq.cO
// $2b$12$ReFZ5hpwtrafnXsywNXYJ.5B2G2vbFAUJZfHTZU3E6SqqHSSN.lPW

console.log(
  bcrypt.compareSync(
    'abc1233',
    '$2b$12$PW/wNnlKl7UMUWy9dZ5.2uIB4V.Ey6rBpuHofERULZdmR7sNKVZO2'
  )
);
