import express from 'express'
import {createStudent, deleteStudent, getAllStudents, getStudent, updateStudent,} from '../controllers/student.controller.js'
import {authMiddleware} from "../middlewares/auth.middlware.js";

const router = express.Router()

router.post("/", authMiddleware, createStudent);
router.get("/", authMiddleware, getAllStudents);
router.get("/:id", authMiddleware, getStudent);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);


export default router;