import JWT from "jsonwebtoken"
// Generate JWT token and send it in cookie
export const generateToken = (res, user, message) => {
  const token = JWT.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
  // Store token in httpOnly cookie and send response
  return res.status(200).cookie("token", token, {
     httpOnly: true,  // Prevent JavaScript access to cookie
     sameSite: 'strict',// Protect against CSRF attacks
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }).json({
    success:true,
    message,
    user
  });
}