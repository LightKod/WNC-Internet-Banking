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
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">Your OTP Verification Code</h2>
        <p>Dear Customer ${customerMail},</p>
        <p>We have received a request to use a One-Time Password (OTP) for an action on our system. Please use the following code:</p>
        <div style="font-size: 18px; font-weight: bold; color: #000; padding: 10px; background: #f4f4f4; border: 1px solid #ddd; display: inline-block;">
          ${otpCode}
        </div>
        <p><strong>Note:</strong> This OTP is valid for 5 minutes only. If you did not request this code, please ignore this email or contact us for assistance.</p>
        <p>Best regards,</p>
        <p><strong>Bankit-PGP Support Team</strong></p>
        <p style="font-size: 12px; color: #555;">This is an automated email. Please do not reply to this message.</p>
      </div>`, // Nội dung email (gửi OTP dưới dạng HTML)
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