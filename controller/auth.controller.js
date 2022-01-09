const { Teacher } = require("../model/sub.model");

async function register(request, response) {
  const { mail } = request.query;
  const { name, email, password } = request.body;
  try {
    const emailExist = Teacher.findOne({ email: mail });
    if (emailExist) {
      response.json({ message: "Account already exist" });
    } else {
      const newTeacher = new Teacher({ name, email, password });
      await newTeacher.save();
      response.json({ message: "Account created successfully" });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
}

async function login(request, response) {
  const { email, password } = request.query;
  try {
    const teacher = await Teacher.findOne({ email: email });
    console.log(teacher);
    if (teacher) {
      if (teacher.password === password) {
        response.json({ message: "Account verified" });
      } else {
        response.json({ message: "Invalid password" });
      }
    } else {
      response.json({ message: "Account doesn't exist. Please sign up!" });
    }
  } catch (error) {
    console.log({ message: error.message });
  }
}

async function sub(request, response) {
  const { email, password, subjects } = request.body;
  try {
    const filter = { email: email, password: password };
    const update = { $set: { Subject: subjects } };
    const teacher = await Teacher.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(teacher);
    response.json({ message: "Subject data added" });
  } catch (error) {
    console.log({ message: error.message });
  }
}

async function attend(request, response) {
  const { email, password, subCode, stuRoll, from, till } = request.query;
  try {
    const teacher = await Teacher.findOne({ email: email, password: password });
    if (teacher) {
      let presentCount = 0;
      let absentCount = 0;
      teacher.Subject.find((it) => it.subCode == subCode)
        ?.student.find((it) => it.rollNo == stuRoll)
        ?.attendence?.filter((it) => it.date >= from && it.date <= till)
        ?.map((it) => {
          if (it.isPresent) {
            presentCount++;
          } else {
            absentCount++;
          }
        });
      console.log(`present ${presentCount} absent ${absentCount}`);
      response.json({
        message: `Present = ${presentCount} & Absent = ${absentCount}`,
      });
    } else {
      response.json({ message: "Account doesn't exist!" });
    }
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
}

// async function attend(request, response) {
//   const { subCode, stuRoll, from, till } = request.query;
//   try {
//     const sub = await Subject.findOne({ subCode: subCode });
//     let flag = false;
//     let present = 0;
//     let absent = 0;
//     if (sub) {
//       let presentCount = 0;
//       let absentCount = 0;
//       sub.student
//         .find((it) => it.rollNo == stuRoll)
//         ?.attendence?.filter((it) => it.date >= from && it.date <= till)
//         ?.map((it) => {
//           if (it.isPresent) {
//             presentCount++;
//           } else {
//             absentCount++;
//           }
//         });
//       console.log(`present ${presentCount} absent ${absentCount}`);
//       let stud = sub.student;
//       let n = stud.length;
//       for (let i = 0; i < n; i++) {
//         if (stud[i].rollNo === stuRoll) {
//           flag = true;
//           let studAtten = stud[i].attendence;
//           let m = studAtten.length;
//           for (let j = 0; j < m; j++) {
//             if (studAtten[j].date >= from && studAtten[j].date <= till) {
//               if (studAtten[j].isPresent) {
//                 present++;
//               } else {
//                 absent++;
//               }
//             }
//           }
//           break;
//         }
//       }
//       if (flag) {
//         console.log(
//           `No of present are ${present} && No of absents are ${absent}`
//         );
//       } else {
//         console.log("Invalid RollNo");
//       }
//     } else {
//       console.log("Invalid subCode");
//     }
//     response.status(201).json({
//       message: flag
//         ? `No of presents are ${present} & No of absents are ${absent}`
//         : "Invalid Query",
//     });
//   } catch (error) {
//     response.status(404).json({ message: error.message });
//   }
// }

module.exports = {
  register,
  login,
  sub,
  attend,
};
