const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const methodOverride = require('method-override');

// Use method-override middleware to allow DELETE via query param
router.use(methodOverride('_method')); // This should be on the router object, not app

// Index Route (List all students)
// router.get('/', async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.render('index', { students });
//   } catch (err) {
//     console.log(err);
//     res.send('Error fetching students');
//   }
// });

router.get('/', async (req, res) => {
  try {
    // Only fetch students where stat is 'A' (Active)
    const students = await Student.find({ stat: 'A' });
    res.render('index', { students });
  } catch (err) {
    console.log(err);
    res.send('Error fetching students');
  }
});


// Add Student Route (Display Add Form)
router.get('/add', (req, res) => {
  res.render('addStudent');
});

// Add Student POST Route (Create new student)
router.post('/add', async (req, res) => {
  console.log("+++++++++++++++", req);
  try {
    const { name, age, grade ,stat} = req.body;
    const newStudent = new Student({ name, age, grade ,stat});
    await newStudent.save();
    res.redirect('/');
  } catch (err) {
    res.send('Error adding student');
  }
});

// Edit Student Route (Show Edit Form)
// router.get('/edit/:id', async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     res.render('editStudent', { student });
//   } catch (err) {
//     console.log(err);
//     res.send('Error fetching student details');
//   }
// });

// // Update Student Route (Update student data)
// router.put('/edit/:id', async (req, res) => {
//   try {
//     const { name, age, grade } = req.body;
//     await Student.findByIdAndUpdate(req.params.id, { name, age, grade });
//     res.redirect('/');
//   } catch (err) {
//     console.log(err);
//     res.send('Error updating student');
//   }
// });

router.get('/edit/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (req.query.delete) {
      // If the delete flag is set, update the stat to 'R' (remove)
      await Student.findByIdAndUpdate(req.params.id, { stat: 'R' });
      return res.redirect('/');  // Redirect after deletion
    }
    
    // Otherwise, it's an edit, render the edit form
    res.render('editStudent', { student });
    
  } catch (err) {
    console.log(err);
    res.send('Error fetching student details');
  }
});

// Update Student Route (for editing)
router.put('/edit/:id', async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    await Student.findByIdAndUpdate(req.params.id, { name, age, grade });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.send('Error updating student');
  }
});

// Delete Student Route
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     await Student.findByIdAndDelete(req.params.id);
//     res.redirect('/');  // Redirect to the list page after deletion
//   } catch (err) {
//     console.log(err);
//     res.send('Error deleting student');
//   }
// });
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     // Find the student by ID and update their status to 'R'
//     await Student.findByIdAndUpdate(req.params.id, { stat: 'R' });
//     res.redirect('/');  // Redirect to the list page after updating
//   } catch (err) {
//     console.log(err);
//     res.send('Error updating student');
//   }
// });

router.delete('/delete/:id', (req, res) => {
  console.log('DELETE request received for ID:', req.params.id);
  // Continue with the update logic...
});




module.exports = router;
