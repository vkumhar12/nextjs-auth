// Importing the connect function from a file located at "@/dbConfig/dbConfig".
import { connect } from "@/dbConfig/dbConfig";

// Importing the User model from a file located at "@/models/userModel".
import User from "@/models/userModel";

// Importing the NextRequest and NextResponse types from "next/server".
import { NextRequest, NextResponse } from "next/server";

// Connecting to the database.
connect();

// Defining an asynchronous function named POST that takes a NextRequest object as an argument.
export async function POST(request: NextRequest) {
  try {
    // Parsing the JSON body of the request.
    const reqBody = await request.json();

    // Destructuring the 'token' property from the request body.
    const { token } = reqBody;

    // Logging the 'token' value to the console.
    console.log(token, "verify email Token");

    // Finding a user in the database based on the 'verifyToken' and 'verifyTokenExpiry' properties.
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, // Ensures that 'verifyTokenExpiry' is greater than the current time.
    });

    // If no user is found, returning a JSON response with an error message and status code 400.
    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    // Logging the found user object to the console.
    console.log(user, "User");

    // Updating the user properties to mark as verified and clearing the verification token fields.
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // Saving the updated user object to the database.
    await user.save();

    // Returning a JSON response indicating successful email verification with status code 500.
    return NextResponse.json(
      { message: "Email verify successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    // Catching any errors that occur during the process and returning a JSON response with the error message and status code 500.
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
