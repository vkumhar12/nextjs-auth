// // Import necessary modules and functions
import { connect } from "@/dbConfig/dbConfig"; // Import the database connection function
import { sendEmail } from "@/helpers/mailer"; // Import the function responsible for sending emails
import User from "@/models/userModel"; // Import the User model
import bcryptjs from "bcryptjs"; // Import the bcryptjs library for password hashing
import { NextRequest, NextResponse } from "next/server"; // Import Next.js server request and response handling utilities

// Establish a connection to the database
connect();

// Define the handler function for the POST request
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body from the incoming request
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody, "Request body");

    // Check if a user with the provided email already exists in the database
    const user = await User.findOne({ email }, { username });
    // const userWithName = await User.findOne();

    // If a user with the provided email already exists, return an error response
    if (user) {
      return NextResponse.json(
        { error: "User already exists with same email" },
        { status: 400 }
      );
    }

    // Generate a salt for password hashing
    const salt = await bcryptjs.genSalt(10);
    // Hash the provided password using the generated salt
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user instance with the provided username, email, and hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password in the 'password' field
    });
    console.log(newUser, "User new");

    // Save the newly created user to the database
    const savedUser = await newUser.save();
    console.log(savedUser, "Saved User");
    // const newUser = await User.create({
    //   username,
    //   email,
    //   password: hashedPassword,
    // });
    // console.log(newUser, "new User from create");

    // Send a verification email to the user
    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    // Return a success response with details of the registered user
    return NextResponse.json({
      message: "User Registered Successfully",
      status: 200,
      success: true,
      newUser,
    });
  } catch (error: any) {
    // If an error occurs during the registration process, return an error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { connect } from "@/dbConfig/dbConfig";
// import { sendEmail } from "@/helpers/mailer";
// import User from "@/models/userModel";
// import bcryptjs from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// connect();

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { username, email, password } = reqBody;

//     console.log(reqBody);

//     //check if user already exists
//     const user = await User.findOne({ email });

//     if (user) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }

//     //hash password
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const savedUser = await newUser.save();
//     console.log(savedUser);

//     //send verification email

//     await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

//     return NextResponse.json({
//       message: "User created successfully",
//       success: true,
//       savedUser,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
