import { jwtHelpers } from "../../helpers/jwtHelper.js";
import prisma from "../../shared/prisma.js";

const loginUser = async (payload) => {
  const { email, password } = payload;

  let isUserExist;
  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { email },
  });
  const patient = await prisma.patient.findUnique({
    where: { email },
  });

  if (!admin && !patient && !doctor) {
    throw new Error("User does not exist");
  }

  if (admin || patient || doctor) {
    isUserExist = admin || patient || doctor;
  }

  if (isUserExist && isUserExist.password !== password) {
    throw new Error("Password is incorrect");
  }
  const payloadData = {
    id: isUserExist?.id,
    email: isUserExist?.email,
    role: isUserExist?.role,
    phoneNumber: isUserExist?.phoneNumber,
    fullName: isUserExist?.fullName,
  };

  //   create token
  const accessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET,
    process.env.EXPIRES_IN
  );
  return { accessToken };
};

const refreshToken = async (token) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const decodedToken = jwtHelpers.decodeToken(token);
  const { email, role, phoneNumber, fullName } = decodedToken;
  if (!email || !role || !phoneNumber || !fullName) {
    throw new Error("Invalid token");
  }

  const admin = await prisma.admin.findUnique({
    where: {
      email,
    },
  });

  const doctor = await prisma.doctor.findUnique({
    where: { email },
  });
  const patient = await prisma.patient.findUnique({
    where: { email },
  });

  if (!admin && !patient && !doctor) {
    throw new Error("User does not exist");
  }
  const payloadData = {
    email: email,
    role: role,
    phoneNumber: phoneNumber,
    fullName: fullName,
  };
  const newAccessToken = jwtHelpers.createToken(
    payloadData,
    process.env.JWT_SECRET,
    process.env.EXPIRES_IN
  );
  return {
    accessToken: newAccessToken,
  };
};
export const authServices = { loginUser, refreshToken };
