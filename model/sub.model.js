const mongoose = require("mongoose");

const subSchema = mongoose.Schema({
  subCode: {
    type: String,
    required: true,
    unique: true,
    sparse: true,
  },
  student: [
    {
      name: {
        type: String,
        required: true,
      },
      rollNo: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
      },
      attendence: [
        {
          date: {
            type: Number,
          },
          isPresent: Boolean,
        },
      ],
    },
  ],
});

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  Subject: {
    type: [subSchema],
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = { Teacher };
