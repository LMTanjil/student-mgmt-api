import {StudentModel} from "../models/student.model.js";

//create student
export const createStudent = async (req, res) => {
    const {name, email, age, phone, course} = req.body;
    try{
        if(!name || !email || !age || !phone || !course){
           return res.status(400).send({message:"Please provide all required fields"});
        }
        const existStudent = await StudentModel.findOne({email});
        if(existStudent){
            return res.status(400).send({message:"Student already exists"});
        }
        const newStudent = await StudentModel.create({
            name,
            email,
            age,
            phone,
            course,
        })
        res.status(201).send({
            message: "Student created successfully",
            data: newStudent
        });
    }catch(err){
        res.status(500).send({message:"Something went wrong",error: err.message});
    }
}

export const getAllStudents = async (req, res) => {
    try{
        const students = await StudentModel.find()
        return res.status(200).send({
            message: "Students found",
            total_students: students.length,
            data: students
        })
    }catch(err){
        return res.status(500).send({message:"Something went wrong", error: err.message});
    }
}

export const getStudent = async (req, res) => {
    const {id} = req.params;
    try{
        const student = await StudentModel.findById(id);
        if(!student){
            return res.status(404).send({message: "Student not found"});
        }
        return res.status(200).send({
            message: "Student found",
            data: student
        })
    }catch(err){
        return res.status(500).send({message: err.message});
    }
}

export const updateStudent = async (req, res) => {
    const {id} = req.params;
    try{
        const updatedStudent = await StudentModel.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedStudent){
            return res.status(404).send({message: "Student not found"});
        }
        return res.status(200).send({
            message: "Student updated successfully",
            data: updatedStudent
        })
    }catch(err){
        return res.status(500).send({message: err.message});
    }
}

export const deleteStudent = async (req, res) => {
    const {id} = req.params;
    try{
        const deletedStudent = await StudentModel.findByIdAndDelete(id);
        if(!deletedStudent){
            return res.status(404).send({message: "Student not found"});
        }
        return res.status(200).send({
            message: "Student deleted successfully",
            data: deletedStudent
        })
    }catch(err){
        return res.status(500).send({message: err.message});
    }
}
