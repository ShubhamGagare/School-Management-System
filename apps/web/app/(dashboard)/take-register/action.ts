'use server'
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

const client = new PrismaClient();
const today = new Date();
const session = await getServerSession(authOptions);
//get all registers for all users
export default async function getListOfALLRegisters(date: Date) {
  //console.log("date---" +session.user)

  console.log("date---" + date.getDate());
  try {
    const response = await client.register.findMany({
      where: {
        date: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()), // Greater than or equal to today
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), // Less than tomorrow
        },
      },
      include: {
        cls: {
          select: {
            name: true,
          },
        },
        teacher: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    console.log("response size action--->" + response.length);
    if (response.length === 0) {
      console.log("resonse is empty from action");
      const response = await createTodaysAllRegister();

      return response;
    }
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createTodaysAllRegister() {
  console.log(
    "----------------Creating All new register for today----------------"
  );
  const classes = await client.cls.findMany();
  classes.map(async (cls:any) => {
    if (cls) {
      const register = await client.register.create({
        data: {
          classId: cls?.id,
          teacherId: cls?.teacherId || cls?.id,
          date: new Date(),
        },
      });

      // Get students for the class
      const studentsForClass = await client.student.findMany({
        where: {
          classId: cls.id,
        },
      });
      // Log the students and register details for debugging

      // Create attendance records for students in the class
      if (studentsForClass) {
        const attendanceData = studentsForClass.map((student:any) => ({
          studentId: student.id,
          registerId: register.id,
          status: "",
        }));
        await client.attendance.createMany({ data: attendanceData });
        await client.attendance.findMany();

        try {
          const response = await client.register.findMany({
            where: {
              date: {
                gte: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate()
                ), // Greater than or equal to today
                lt: new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 1
                ), // Less than tomorrow
              },
            },
            include: {
              cls: {
                select: {
                  name: true,
                },
              },
              teacher: {
                select: {
                  user: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
          });
          console.log(
            "------------------returning create register---------------"
          );
          if (response.length === 0) {
            console.log("Inside resonse is empty");
          }
          return response;
        } catch (error) {
          console.log(error);
          return [];
        }
      }
    }
  });
}

//creat all registers for all users

// get todays register for user
export async function getListOfRegisters(date: Date) {
  console.log("session---" + JSON.stringify(session));
  try {
    const response = await client.register.findMany({
      where: {
        date: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()), // Greater than or equal to today
          lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), // Less than tomorrow
        },
        teacher: {
          userId: Number(session.user.id),
        },
      },
      include: {
        cls: {
          select: {
            name: true,
          },
        },
        teacher: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });
    if (response.length === 0) {
      console.log("resonse is empty");
      const response = await createTodaysRegister(date);

      return response;
    }
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//create todays register for user
export async function createTodaysRegister(date: Date) {
  console.log(
    "----------------Creating  new register for today----------------"
  );

  const cls = await client.cls.findFirst({
    where: {
      teacherId: Number(session.user.id),
    },
  });
  if (cls) {
    const register = await client.register.create({
      data: {
        classId: cls?.id,
        teacherId: cls?.teacherId || cls?.id,
        date: new Date(),
      },
    });

    // Get students for the class
    const studentsForClass = await client.student.findMany({
      where: {
        classId: cls.id,
      },
    });
    // Log the students and register details for debugging

    // Create attendance records for students in the class
    if (studentsForClass) {
      const attendanceData = studentsForClass.map((student:any) => ({
        studentId: student.id,
        registerId: register.id,
        status: "",
      }));
      await client.attendance.createMany({ data: attendanceData });
      await client.attendance.findMany();

      try {
        const response = await client.register.findMany({
          where: {
            date: {
              gte: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              ), // Greater than or equal to today
              lt: new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + 1
              ), // Less than tomorrow
            },
            teacher: {
              userId: Number(session.user.id),
            },
          },
          include: {
            cls: {
              select: {
                name: true,
              },
            },
            teacher: {
              select: {
                user: {
                  select: {
                    username: true,
                  },
                },
              },
            },
          },
        });
        console.log(
          "------------------returning create register---------------"
        );
        if (response.length === 0) {
          console.log("Inside resonse is empty");
        }
        return response;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  }
}

export async function customDateRegisters(date: Date, id: number) {
  const regData: any = await getListOfALLRegisters(date);
  const usersRegisters = regData.filter((register: any) => {
    if (Number(register.teacherId) === Number(id)) {
      return register;
    }
  });
  return usersRegisters;
}