"use server"
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import axios from "axios"
const client = new PrismaClient()



interface regType extends NextApiRequest {
    id: number
    classId: number,
    teacherId: number,
    date: Date,
    Attendance: [
      { id: number, student: Object, status: string, comment: string, lateMinutes: number },
    ],
    cls: { name: string }
  
  }
 export  async function updateRegister(req: regType) {
    const register = req; // Assuming 'register' object is passed in request body
  
    try {
      // Update register in the database
      // const updatedRegister = await client.register.update({
      //   where: { id: register.id }, // Adjust according to your schema
      //   data: {
      //     Attendance: {
      //       update: register.Attendance.map((student: any) => ({
      //         where: { id: student.id },
      //         data: {
      //           status: student.status,
      //           comment: student.comment || "",
      //           lateMinutes: student.lateMinutes || 0
      //         }
      //       }))
      //     },
      //     status: "Completed"
  
      //     // Update the Attendance field
      //     // Add other fields as needed
      //   }
      // });
  
      //console.log("Register updated:", updatedRegister);
      // res.status(200).json(updatedRegister);
    } catch (error) {
      console.error('Error updating register:', error);
      //  res.status(500).json({ error: 'Failed to update register' });
    }
  }
  // type Register = {
  //   "id": number,
  //   "student": {
  //     "user": {
  //       "username": string
  //     }
  //   },
  //   "status": string
  
  // }
  // const columns: ColumnDef<Register>[] = [
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //   },
  //   {
  //     accessorKey: "student.user.username",
  //     header: "Name",
  //   },
  
  // ]
  
  
  
  //const query = { "abc": "what time is" }
  
  export const getMonthlyMark = async (id: number) => {
    const date = new Date();
    const response = await client.attendance.findMany({
      where: {
        studentId: id,
        date : {
          gte: new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()), // Greater than or equal to last moth
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) // Less than tomorrow
        },
      },
      
    });
    console.log("Monthly attendance ------------->" + JSON.stringify(response))
    return response;
  }
  
  
  export  const getAttendacePattern = async (id:number) => {
    //const message = [{ role: "user", content: "You are a helpful assistant." }]
    const allAttendance = await getMonthlyMark(id)
    const expectedOutputFormat= {
      "studentId": 12,
      "insight": "one liner insight",
      "tags": ["Tag1", "Tag2"]
    }
    const query = {"query": "Analyze the following attendance data for each student, provide a one-liner insight and 2-3 word tags indicating the attendance pattern for each student in json with parent array results:",expectedOutputFormat,allAttendance}
  
    const pattern = await axios.post("http://localhost:3000/api/chat", {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const insight = pattern.data.choices[0].message.content
    // const parsedPattern = JSON.parse(pattern.data)
    // const pattern =  axios.post("/api/attendancePattern",message)
    console.log("Pattern--------->" + JSON.stringify(insight))
    return insight
  
  }