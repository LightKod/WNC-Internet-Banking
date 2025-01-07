import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tminhkhoa91@gmail.com', // Địa chỉ email của bạn
    pass: process.env.EMAIL_PASS || '', // Mật khẩu của bạn
  },
});

const EmailService = ({ customerMail, otpCode, subject }) => {
  return new Promise((resolve, reject) => {
    console.log("người nhận: " +customerMail)
    // Cấu trúc nội dung email
    const mailOptions = {
      from: 'your_email@gmail.com', // Địa chỉ email người gửi
      to: customerMail, // Địa chỉ email người nhận
      subject: subject, // Chủ đề email
      html: `
        <h1>Your OTP Code</h1>
        <p>Your one-time password (OTP) is: <strong>${otpCode}</strong></p>
        <p>This OTP is valid for 5 minutes.</p>
      `, // Nội dung email (gửi OTP dưới dạng HTML)
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error); // Trả về lỗi nếu có lỗi xảy ra
      } else {
        console.log('Email sent:', info.response);
        resolve(info); // Trả về thông tin gửi email thành công
      }
    });
  });
};

export default EmailService;