const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId;

const users = [
      {
    name: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    ipAddress: '',
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
    verified: true,
    phone: "0000000000",
    mobile: '1111111111',
    location: 'Perth', 
    company: 'CTL', 
    role: 'Admin', 
    deliveryAddress: 'Bayswater', 
    billAddress: 'Bayswater', 
    state: 'WA', 
    postCode: '6000',
  },
  {
    _id: ObjectId("639be87444488030633bbc7d"),
    name: 'John',
    lastName: 'Doe',
    email: 'john@slrltd.com',
    verified: true,
    ipAddress: '',
    password: bcrypt.hashSync('john@slrltd.com', 10),
    phone: '0455555555',
    mobile: '0422222222',
    location: 'Perth', 
    company: 'SLR', 
    role: 'purchase officer', 
    deliveryAddress: 'Bayswater', 
    billAddress: 'Bayswater', 
    state: 'WA', 
    postCode: '6000',
  },
]

module.exports = users
