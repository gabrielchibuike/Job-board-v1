import express, { Request, Response } from "express";
import User from "../model/user";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const generateEmail = async (res: Response, email: string) => {
  const ResetPasswordToken = jwt.sign(
    { email: email },
    process.env.ACCESS_TOKEN_PRIVATE_KEY!,
    { expiresIn: "15m" }
  );
  try {
    // const store_reset_link = await User.findOneAndUpdate(
    //   { _id: "660c4ca45c095a1c50a1e2f3" },
    //   { otp: ResetPasswordToken },
    //   { new: true }
    // );
    // if (!store_reset_link) console.log("something went wrong");
    // console.log(store_reset_link);

    const link = `http://localhost:5173/reset-password?token=${ResetPasswordToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gabrielnwagu2002@gmail.com",
        pass: "joaayblzmjukvrmp",
      },
    });

    const html = `<p>Click the above link to verify your email <a href = ${link}>${link}</a>.</p>`;
    const mailOptions = {
      from: "gabriel2002@gmail.com",
      to: "gabrielnwagu2002@gmail.com",
      subject: "verify Email",
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        res.send("Email sent! successfull");
        console.log("Email sent:", info.response);
      }
    });
  } catch (err) {
    res.json({ status: "error", msg: err });
    console.log(err);
  }
};
export default generateEmail;
